package com.test.controller;

import com.test.dto.AuthenticationRequest;
import com.test.dto.RegistrationRequest;
import com.test.service.AuthService;
import com.test.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping(value = "/signup", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerRequest(@RequestBody RegistrationRequest request) {
        userService.saveUser(request);
        return ResponseEntity
                .status(CREATED)
                .build();
    }


    @PostMapping(value = "/authenticate", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> authenticateRequest(@RequestBody AuthenticationRequest request) {
        String token = authService.authenticateRequest(request);
        return ResponseEntity
                .ok()
                .header(AUTHORIZATION, String.format("Bearer %s", token))
                .build();
    }

}
