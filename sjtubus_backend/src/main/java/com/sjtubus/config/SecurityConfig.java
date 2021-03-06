/*
 * Copyright 2002-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.sjtubus.config;

import com.sjtubus.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsUtils;

/**
 * @author Allen
 */

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	AdministratorService administratorService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS).permitAll()
				.requestMatchers(CorsUtils::isPreFlightRequest).permitAll() //对preflight放行
				.antMatchers("/css/**","/js/**","/images/**").permitAll()
				.antMatchers("/**/search").authenticated()
				.antMatchers("/**/add").authenticated()
				.antMatchers("/**/modify").authenticated()
				.antMatchers("/**/delete").authenticated()
				.antMatchers("/","/index").authenticated()
				.and()
				.formLogin().loginPage("/adminlogin").failureUrl("/error")
                .and().csrf().disable();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new MyPasswordEncoder();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		//设置UserDetailsService以及密码规则
		auth.userDetailsService(administratorService).passwordEncoder(passwordEncoder());
	}
}
