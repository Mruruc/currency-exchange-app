package com.test.controller;

import com.test.config.UserAdapter;
import com.test.dto.DepositRequest;
import com.test.dto.UserBalanceDto;
import com.test.dto.WithdrawRequest;
import com.test.model.Currency;
import com.test.model.UserBalance;
import com.test.model.UserBalanceId;
import com.test.service.UserBalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/balance")
@RequiredArgsConstructor
public class UserBalanceController {
    private final UserBalanceService balanceService;

    @GetMapping
    public List<UserBalanceDto> getAllCurrencyBalance(Authentication authentication){
        Long userId = getUserIdFromAuthentication(authentication);
        return balanceService.findAllBalanceByUserId(userId);
    }

    @PostMapping(value = "/create-account/{currency}",consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createCurrencyAccount(
            @PathVariable Currency currency,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        balanceService.createCurrencyAccount(userId, currency);
        return ResponseEntity.status(CREATED).build();
    }

    @PostMapping(value = "/deposit", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> depositFunds(
            @RequestBody DepositRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        balanceService.deposit(userId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(value = "/withdraw", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> withdrawFunds(
            @RequestBody WithdrawRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        balanceService.withdraw(userId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(value = "/{currency}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<UserBalance> getUserBalance(@PathVariable Currency currency, Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        UserBalanceId balanceId = new UserBalanceId(userId, currency);
        UserBalance userBalance = balanceService.getUserBalance(balanceId);
        return ResponseEntity.ok(userBalance);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        var user = (UserAdapter) authentication.getPrincipal();
        return user.getUserId();

    }
}
