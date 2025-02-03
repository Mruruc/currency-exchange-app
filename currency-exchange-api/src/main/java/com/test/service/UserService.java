package com.test.service;

import com.test.config.UserAdapter;
import com.test.dto.RegistrationRequest;
import com.test.exceptions.EntityNotFoundException;
import com.test.mapper.UserMapper;
import com.test.model.User;
import com.test.repository.UserRepository;
import com.test.validation.DtoValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository repository;
    private final DtoValidator<RegistrationRequest> validator;
    private final UserMapper mapper;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository
                .findUserByEmail(username)
                .map(UserAdapter::new)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found!"));
    }

    public void saveUser(RegistrationRequest dto) {
        validator.validate(dto);
        User user = mapper.toEntity(dto);
        repository.save(user);
    }


    public User findUserById(Long userId) {
        return repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        format("User with id : %s not found", userId))
                );
    }
}
