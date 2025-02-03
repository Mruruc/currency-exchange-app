package com.test.dto;

import com.test.model.Currency;

import java.math.BigDecimal;

public record UserBalanceDto(
        Currency currency,
        BigDecimal balance
) {
}
