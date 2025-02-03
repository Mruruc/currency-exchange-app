package com.test.service;

import com.test.dto.DepositRequest;
import com.test.dto.UserBalanceDto;
import com.test.dto.WithdrawRequest;
import com.test.exceptions.EntityNotFoundException;
import com.test.exceptions.InsufficientBalanceException;
import com.test.model.*;
import com.test.repository.UserBalanceRepository;
import com.test.validation.DtoValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class UserBalanceService {
    private final DtoValidator<DepositRequest> depositRequestDtoValidator;
    private final DtoValidator<WithdrawRequest> withdrawRequestDtoValidator;
    private final UserBalanceRepository repository;
    private final UserService userService;
    private final TransactionService transactionService;


    public void createCurrencyAccount(Long userId, Currency currency) {
        User user = userService.findUserById(userId);

        var userBalanceId = UserBalanceId.builder()
                .userId(user.getId())
                .currency(currency)
                .build();
        var userBalance = UserBalance.builder()
                .id(userBalanceId)
                .balance(BigDecimal.ZERO)
                .user(user)
                .build();
        repository.save(userBalance);
    }


    public void deposit(Long userId, DepositRequest request) {
        depositRequestDtoValidator.validate(request);

        User user = userService.findUserById(userId);

        var userBalance = getUserBalance(
                new UserBalanceId(user.getId(), request.currency())
        );

        BigDecimal updatedBalance = userBalance.getBalance()
                .add(request.amount());
        userBalance.setBalance(updatedBalance);
        repository.save(userBalance);

        var transaction = Transaction.builder()
                .currencyTo(request.currency())
                .amountTo(request.amount())
                .type(TransactionType.DEPOSIT)
                .user(user)
                .build();
        transactionService.createTransaction(transaction);
    }


    public void withdraw(Long userId, WithdrawRequest request) {
        withdrawRequestDtoValidator.validate(request);

        User user = userService.findUserById(userId);

        var userBalance = getUserBalance(
                new UserBalanceId(user.getId(), request.currency())
        );

        BigDecimal currentBalance = userBalance.getBalance();

        if (currentBalance.compareTo(request.amount()) < 0) {
            throw new InsufficientBalanceException(
                    format("Insufficient balance. Available: %s, Requested: %s",
                            currentBalance, request.amount())
            );
        }

        BigDecimal updatedBalance = currentBalance.subtract(request.amount());
        userBalance.setBalance(updatedBalance);

        repository.save(userBalance);

        var transaction = Transaction.builder()
                .currencyFrom(request.currency())
                .amountTo(request.amount())
                .type(TransactionType.WITHDRAW)
                .user(user)
                .build();
        transactionService.createTransaction(transaction);

    }

    public UserBalance getUserBalance(UserBalanceId id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        format("No balance found for user with currency: %s", id.getCurrency())
                ));
    }


    public List<UserBalanceDto> findAllBalanceByUserId(Long userId) {
        return repository.findAllByUserId(userId);
    }
}
