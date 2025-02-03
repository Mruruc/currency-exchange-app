package com.test.repository;

import com.test.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("FROM Transaction t WHERE t.type = 'EXCHANGE'")
    List<Transaction> findAllByTypeExchange();
}
