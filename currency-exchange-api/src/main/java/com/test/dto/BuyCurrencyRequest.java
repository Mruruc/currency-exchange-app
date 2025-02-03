package com.test.dto;

import com.test.model.Currency;

import java.math.BigDecimal;

public record BuyCurrencyRequest(
        Currency currency,
        BigDecimal amountInPln
) {
}
