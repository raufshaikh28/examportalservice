import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:null,
      title: '',
      description: '',
      maxMarks: '',
      noOfQuestions: '',
      active: false,
      category: {
          cid: null,
          title:'',
          description:''
      }
    },
  ]
  constructor(private _quiz:QuizService) {
    
  }

  ngOnInit(): void {
      this._quiz.quizzes().subscribe(
        (data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error','Error in Loading Data','error');
        }
      )
  }

  deleteQuiz(qId:any){

    Swal.fire({
      icon:'question',
      title:'Are you sure?',
      confirmButtonText:'Delete',
      confirmButtonColor:'primary',
      showCancelButton:true
    }).then((result)=>{

      if(result.isConfirmed){
        //deleting
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
            this.quizzes = this.quizzes.filter(
              (quiz)=> quiz.qId != qId
              );
            Swal.fire('Success','Quiz Deleted Successfully!!','success');
          },
          (error)=>{
            Swal.fire('Error!','Error in deleting Quiz!!','error');
    
          }
    
        );
      }
    })

  }

}
