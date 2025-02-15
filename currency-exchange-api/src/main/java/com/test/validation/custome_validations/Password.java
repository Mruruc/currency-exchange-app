package com.test.validation.custome_validations;


import com.test.validation.custome_validations.Impl.PasswordValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
@NotBlank(message = "Password can not be empty!")
public @interface Password {
    String message() default """
            Password must contains at least one digit and one uppercase and one lowercase character,
            and at least 8 character.""";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
