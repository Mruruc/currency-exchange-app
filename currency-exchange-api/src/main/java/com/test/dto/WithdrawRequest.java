package com.test.dto;

import com.test.model.Currency;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record WithdrawRequest(
        @NotNull
        Currency currency,
        @NotNull
        @DecimalMin(value = "0.00", inclusive = false)
        BigDecimal amount
) {
}
