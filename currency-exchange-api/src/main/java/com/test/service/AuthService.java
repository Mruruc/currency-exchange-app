package com.test.service;

import com.test.dto.AuthenticationRequest;
import com.test.validation.DtoValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final DtoValidator<AuthenticationRequest> validator;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public String authenticateRequest(AuthenticationRequest request) {
        validator.validate(request);

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        return jwtService.generateAccessToken(request.email());
    }


}
