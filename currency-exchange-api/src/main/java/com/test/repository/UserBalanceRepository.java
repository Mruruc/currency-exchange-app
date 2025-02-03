package com.test.repository;

import com.test.dto.UserBalanceDto;
import com.test.model.User;
import com.test.model.UserBalance;
import com.test.model.UserBalanceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserBalanceRepository extends JpaRepository<UserBalance, UserBalanceId> {
    List<UserBalance> findByUser(User user);

    @Query("""
                SELECT new com.test.dto.UserBalanceDto(ub.id.currency, ub.balance)
                FROM UserBalance ub
                WHERE ub.id.userId = :userId
            """)
    List<UserBalanceDto> findAllByUserId(Long userId);
}
