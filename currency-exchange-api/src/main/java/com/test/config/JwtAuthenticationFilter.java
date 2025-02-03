package com.test.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.handeler.exception_dto.ExceptionResponse;
import com.test.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;


    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {


        if (isAuthenticationEndpoint(request) || !isAuthorizationHeaderValid(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            authenticateRequest(request);
        } catch (ExpiredJwtException | UsernameNotFoundException exception) {
            exceptionHandler(response, exception);
            return;
        }
        filterChain.doFilter(request, response);
    }


    private <T extends RuntimeException> void exceptionHandler(HttpServletResponse response, T exception) throws IOException {
        response.setStatus(UNAUTHORIZED.value());
        response.setContentType(APPLICATION_JSON_VALUE);

        response.getWriter().write(
                objectMapper.writeValueAsString(
                        ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .build()
                )
        );
    }


    private void authenticateRequest(HttpServletRequest request) {
        String jwtToken = extractToken(request);

        UserDetails userDetails = jwtService.validateToken(jwtToken);

        var authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private String extractToken(HttpServletRequest request) {
        return getAuthHeader(request).substring(7);
    }

    private boolean isAuthorizationHeaderValid(HttpServletRequest request) {
        String authHeader = getAuthHeader(request);
        return authHeader != null && authHeader.startsWith("Bearer ");
    }

    private String getAuthHeader(HttpServletRequest request) {
        return request.getHeader(AUTHORIZATION);
    }

    private boolean isAuthenticationEndpoint(HttpServletRequest request) {
        String servletPath = request.getServletPath();
        return servletPath.contains("/auth/");
    }
}
