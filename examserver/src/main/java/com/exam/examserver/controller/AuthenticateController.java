package com.exam.examserver.controller;

import java.security.Principal;
import org.springframework.security.core.Authentication;
import org.aspectj.weaver.tools.Trace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationManagerResolver;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.authentication.AuthenticationManagerFactoryBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.config.JwtUtils;
import com.exam.examserver.model.JwtRequest;
import com.exam.examserver.model.JwtResponse;
import com.exam.examserver.model.User;
import com.exam.examserver.service.impl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	//generate Token 
	
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		boolean wrongPass =false;
		try {
			wrongPass=authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
			
		}catch (UsernameNotFoundException e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new Exception("User not Found");
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println(e);
		}
		
		
		/////Authenticate user
		if(wrongPass) {
			UserDetails userDetails= this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
			String token = this.jwtUtils.generateToken(userDetails);
			return ResponseEntity.ok(new JwtResponse(token));
		}
		else {
			return ResponseEntity.badRequest().body("Please Enter Correct Password And Username");
		}
	}
	
	private boolean authenticate(String username, String password) {
	    try {
	        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);
	        authenticationManager.authenticate(authentication);
	        return true; // Authentication succeeded
	    } catch (DisabledException e) {
	        System.out.println("User Disabled");
	        return false; // Authentication failed
	    } catch (BadCredentialsException e) {
	        System.out.println("Wrong password");
	        return false; // Authentication failed
	    } catch (Exception e) {
	        e.printStackTrace();
	        System.out.println(e);
	        return false; // Authentication failed due to an unexpected exception
	    }
	}
	
//	private boolean authenticate(String username,String password) throws Exception {
//		
//		try {
//			
//			Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);
//			
//			authenticationManager.authenticate(authentication);
//			return true;
//			
//		}catch (DisabledException e) {
//			// TODO: handle exception
//			throw new Exception("User Disabled "+e.getMessage());
//			return false;
//		}catch (BadCredentialsException e) {
//			// TODO: handle exception
//			System.out.println("Wrong password");
//			throw new Exception("Invalid Credential "+e.getMessage());
//			return false;
//		}catch (Exception e) {
//			// TODO: handle exceptione
//			e.printStackTrace();
//			System.out.println(e);
//			return false;
//		}
//
//	}
	
	//return the details of current user	
	@GetMapping("/current-user")
	public User  getCurrentUser(Principal principal) {
		
		
		return ((User)this.userDetailsServiceImpl.loadUserByUsername(principal.getName()));
		
	}
	
}
