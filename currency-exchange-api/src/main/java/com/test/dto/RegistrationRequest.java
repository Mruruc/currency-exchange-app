package com.test.dto;

import com.test.validation.custome_validations.Password;
import com.test.validation.custome_validations.ValidEmail;

public record RegistrationRequest(
        @ValidEmail
        String email,
        @Password
        String password
) {
}
