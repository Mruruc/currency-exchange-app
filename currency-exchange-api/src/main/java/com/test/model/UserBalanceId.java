package com.test.model;


import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserBalanceId implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;


    private Long userId;
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserBalanceId that = (UserBalanceId) o;

        if (!Objects.equals(userId, that.userId)) return false;
        return currency == that.currency;
    }

    @Override
    public int hashCode() {
        int result = (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (currency != null ? currency.hashCode() : 0);
        return result;
    }

}
