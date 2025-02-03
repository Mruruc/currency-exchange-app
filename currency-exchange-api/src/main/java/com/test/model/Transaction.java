package com.test.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
@EntityListeners(AuditingEntityListener.class)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_pk_generator")
    @SequenceGenerator(name = "transaction_pk_generator", allocationSize = 1)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Currency currencyFrom;

    @Enumerated(EnumType.STRING)
    private Currency currencyTo;


    @Column( scale = 4, precision = 19)
    private BigDecimal amountFrom;

    @Column(nullable = false, scale = 4, precision = 19)
    private BigDecimal amountTo;

    @Column( scale = 6, precision = 19)
    private BigDecimal exchangeRate;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
