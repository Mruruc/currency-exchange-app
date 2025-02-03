package com.test;

import com.test.model.Role;
import com.test.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class currencyExchangeApp {

    public static void main(String[] args) {
        SpringApplication.run(currencyExchangeApp.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository repository, RoleRepository roleRepository){
        return args -> {
            roleRepository.save(
                    Role.builder()
                            .name("USER")
                            .build()
            );
        };
    }
}
