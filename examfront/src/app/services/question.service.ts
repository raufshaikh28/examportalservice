import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

  //get all quetions of quiz
  public getQuestionsOfQuiz(qid: any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

    //get all quetions of quiz for test
    public getQuestionsOfQuizForTest(qid: any){
      return this._http.get(`${baseUrl}/question/quiz/${qid}`);
    }

  //add questions
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete quetion
  public deleteQuestion(qid:any){
     return this._http.delete(`${baseUrl}/question/${qid}`);
  }

  //eval quiz
    public evalQuiz(questions: any){
      return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
    }
}
