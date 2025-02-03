package com.test.service;

import com.test.model.Transaction;
import com.test.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository repository;


    public void createTransaction(Transaction transaction) {
        repository.save(transaction);
    }


    public List<Transaction> getExchangeTransactions(){
        return repository.findAllByTypeExchange();
    }
}
