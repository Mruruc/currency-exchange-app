package com.test.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.test.config.UserAdapter;
import com.test.dto.BuyCurrencyRequest;
import com.test.dto.DepositRequest;
import com.test.dto.SellCurrencyRequest;
import com.test.dto.WithdrawRequest;
import com.test.exceptions.ExternalApiCallException;
import com.test.exceptions.InsufficientBalanceException;
import com.test.model.*;
import com.test.validation.DtoValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.math.RoundingMode;

import static com.test.model.Currency.PLN;
import static com.test.model.TransactionType.EXCHANGE;

@Service
@RequiredArgsConstructor
public class ExchangeService {
    private final DtoValidator<BuyCurrencyRequest> dtoValidator;
    private final DtoValidator<SellCurrencyRequest> sellCurrencyRequestValidator;
    private final UserService userService;
    private final UserBalanceService balanceService;
    private final RestClient restClient;
    private final TransactionService transactionService;

    public void sellCurrency(Authentication authentication, SellCurrencyRequest request) {
        sellCurrencyRequestValidator.validate(request);

        Long userId = extractUserId(authentication);
        User user = userService.findUserById(userId);

        Currency currencyToSell = request.currency();
        BigDecimal amountToSell = request.amountToSell();

        var balanceId = UserBalanceId.builder()
                .currency(currencyToSell)
                .userId(user.getId())
                .build();
        UserBalance userBalance = balanceService.getUserBalance(balanceId);

        BigDecimal currentBalance = userBalance.getBalance();
        if (currentBalance.compareTo(amountToSell) < 0) {
            throw new InsufficientBalanceException("Insufficient balance to sell.");
        }

        BigDecimal sellRate = getMidRate(currencyToSell);
        BigDecimal plnAmountToBuy = amountToSell.multiply(sellRate);

        balanceService.withdraw(
                userId, new WithdrawRequest(currencyToSell, amountToSell)
        );

        balanceService.deposit(userId, new DepositRequest(PLN, plnAmountToBuy));

        var transaction = Transaction.builder()
                .currencyFrom(currencyToSell)
                .currencyTo(PLN)
                .amountFrom(amountToSell)
                .amountTo(plnAmountToBuy)
                .exchangeRate(sellRate)
                .type(EXCHANGE)
                .user(user)
                .build();
        transactionService.createTransaction(transaction);

    }

    public void buyCurrency(Authentication authentication, BuyCurrencyRequest request) {
        dtoValidator.validate(request);

        Long userId = extractUserId(authentication);
        User user = userService.findUserById(userId);

        BigDecimal plnAmountToSell = request.amountInPln();
        Currency currencyToBuy = request.currency();


        var balanceId = UserBalanceId.builder()
                .currency(PLN)
                .userId(user.getId())
                .build();
        UserBalance userBalance = balanceService.getUserBalance(balanceId);

        BigDecimal currentBalance = userBalance.getBalance();
        if (currentBalance.compareTo(plnAmountToSell) < 0) {
            throw new InsufficientBalanceException("Insufficient balance to sell.");
        }

        BigDecimal buyRate = getMidRate(currencyToBuy);
        BigDecimal amountToBuy = plnAmountToSell.divide(buyRate, 4, RoundingMode.HALF_DOWN);

        balanceService.withdraw(
                userId, new WithdrawRequest(PLN, plnAmountToSell)
        );

        balanceService.deposit(userId, new DepositRequest(currencyToBuy, amountToBuy));

        var transaction = Transaction.builder()
                .currencyFrom(PLN)
                .currencyTo(currencyToBuy)
                .amountFrom(plnAmountToSell)
                .amountTo(amountToBuy)
                .exchangeRate(buyRate)
                .type(EXCHANGE)
                .user(user)
                .build();
        transactionService.createTransaction(transaction);

    }

    private Long extractUserId(Authentication authentication) {
        var user = (UserAdapter) authentication.getPrincipal();
        return user.getUserId();
    }

    private BigDecimal getMidRate(Currency currency) {
        String currencyCode = currency.name();
        JsonNode body = restClient.get()
                .uri(currencyCode)
                .retrieve()
                .body(JsonNode.class);

        if (body == null || !body.has("rates")) {
            throw new ExternalApiCallException("Could not fetch exchange rate for " + currency);
        }

        return body.get("rates").get(0).get("mid").decimalValue();

    }
}
