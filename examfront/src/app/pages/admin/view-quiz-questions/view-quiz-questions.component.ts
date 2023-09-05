import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent   implements OnInit{

  qId:any;
  qTitle:any;
  questions:any;
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
      }

    );

  }
//delete question
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'question',
      title:'Are you sure want to Delete this Question?',
      confirmButtonText:'Delete',
      confirmButtonColor:'primary',
      showCancelButton:true
    }).then((result)=>{

      if(result.isConfirmed){
        //deleting
        this._question.deleteQuestion(quesId).subscribe(
          (data:any)=>{
            Swal.fire('Success','Question Deleted Successfully!!','success');
            window.location.reload();
          },
          (error)=>{
            Swal.fire('Error!','Error in deleting Question!!','error');
    
          }
    
        );
      }
    })
  }

}
