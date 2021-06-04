package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override

    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
//        http
//                .authorizeRequests()
//                .anyRequest().access("hasIpAddress('0.0.0.0/0')");
//
//        http.authorizeRequests()
//                .antMatchers("/login").permitAll()
//                .antMatchers("/**").hasIpAddress("locahost")
//                .antMatchers("/**").hasIpAddress("192.168.0.102")
//                .antMatchers("/**").hasIpAddress("192.168.0.103")
//
//                .csrf().disable();
    }
}
