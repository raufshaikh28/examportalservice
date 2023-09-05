package com.exam.examserver.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long>{

	Set<Question> findByQuiz(Quiz quiz);

}
