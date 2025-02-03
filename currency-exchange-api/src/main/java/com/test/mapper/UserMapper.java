package com.test.mapper;

import com.test.dto.RegistrationRequest;
import com.test.exceptions.EntityNotFoundException;
import com.test.model.Role;
import com.test.model.User;
import com.test.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
@AllArgsConstructor
public class UserMapper {
    private final PasswordEncoder encoder;
    private final RoleRepository roleRepository;

    public User toEntity(RegistrationRequest dto) {
        Objects.requireNonNull(dto);
        String hashedPassword = encoder.encode(dto.password());
        var roles = this.getUserRole("USER");
        return User.builder()
                .email(dto.email())
                .password(hashedPassword)
                .isAccountEnabled(true)
                .isAccountLocked(false)
                .roles(roles)
                .build();
    }

    private List<Role> getUserRole(String role) {
        Role userRole = roleRepository.findRoleByName("USER")
                .orElseThrow(() -> new EntityNotFoundException("Role Not Found!"));
        return Collections.singletonList(userRole);
    }

}
