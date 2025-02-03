package com.test.config;

import com.test.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Collection;
import java.util.stream.Collectors;


public record UserAdapter(
        User user
) implements UserDetails, Principal {

    public Long getUserId() {
        assert user != null;
        return user.getId();
    }

    @Override
    public String getUsername() {
        assert user != null;
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        assert user != null;
        return user.getPassword();
    }

    @Override
    public boolean isAccountNonLocked() {
        assert user != null;
        return !user.isAccountLocked();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        assert user != null;
        return user.isAccountEnabled();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        assert user != null;
        return user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());
    }

    @Override
    public String getName() {
        assert user != null;
        return user.getEmail();
    }
}
