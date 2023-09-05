package com.exam.examserver.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.model.exam.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	
}
