package com.example.homebookexpress.config;

import com.example.homebookexpress.appuser.AppUserRole;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebMvc
public class SecurityConfiguration {
    private static final String[] AUTH_WHITELIST = {
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**",
            // other public endpoints of your API may be appended to this array
            "/api/v1/auth/register",
            "/api/v1/auth/authenticate",
            "/api/v1/getpopularbooks"
    };

    private static final String[] ADMIN_POST = {
            "/api/v1/book/addbook",
            "/api/v1/authors/addauthor",
            "/api/v1/bookgenre/addbookgenre"
    };

    private static final String[] ADMIN_DELETE = {
            "/api/v1/book/deletebook",
            "/api/v1/authors/deleteauthor",
            "/api/v1/bookgenre/deletebookgenre",
            "/api/v1/appuser/deleteuser"
    };

    private static final String[] ADMIN_PUT = {
            "/api/v1/book/updatebook",
            "/api/v1/authors/updateauthor",
            "/api/v1/bookgenre/updatebookgenre"
    };
    private final AuthenticationProvider authenticationProvider;
    private final Filter jwtAuthFilter;
    private final LogoutService logoutService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf()
                .disable().cors().and()
                .authorizeHttpRequests()
                    .requestMatchers(AUTH_WHITELIST).permitAll()
                    .requestMatchers("/api/v1/auth/logout").authenticated()
                    .requestMatchers(HttpMethod.GET, "/api/v1/book/**").authenticated()
                    .requestMatchers(HttpMethod.POST, "/api/v1/rentals/**").hasAuthority(AppUserRole.USER.name())
                    .requestMatchers(HttpMethod.POST, ADMIN_POST).hasAuthority(AppUserRole.ADMIN.name())
                    .requestMatchers(HttpMethod.PUT, ADMIN_PUT).hasAuthority(AppUserRole.ADMIN.name())
                    .requestMatchers(HttpMethod.DELETE, ADMIN_DELETE).hasAuthority(AppUserRole.ADMIN.name())
                    .requestMatchers(HttpMethod.GET,"/api/v1/appuser/getallusers").hasAuthority(AppUserRole.ADMIN.name())
                    .requestMatchers(HttpMethod.GET,"/api/v1/getemailbytoken").authenticated()
               .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .addLogoutHandler(logoutService)
                .logoutSuccessHandler(((request, response, authentication) ->
                        SecurityContextHolder.clearContext()));

        return httpSecurity.build();
    }
}
