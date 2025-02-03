package com.test.controller;

import com.test.dto.BuyCurrencyRequest;
import com.test.dto.SellCurrencyRequest;
import com.test.service.ExchangeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/currency-exchange")
@RequiredArgsConstructor
public class ExchangeController {
    private final ExchangeService exchangeService;

    @PostMapping(value = "/purchase", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> purchaseCurrency(@RequestBody BuyCurrencyRequest request, Authentication authentication) {
        exchangeService.buyCurrency(authentication, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value = "/sale", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> sellCurrency(@RequestBody SellCurrencyRequest request, Authentication authentication) {
        exchangeService.sellCurrency(authentication, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
