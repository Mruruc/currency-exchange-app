package com.test.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_balances")
@EntityListeners(AuditingEntityListener.class)
public class UserBalance {

    @EmbeddedId
    private UserBalanceId id;

    @Column(nullable = false, scale = 4, precision = 19)
    private BigDecimal balance;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
