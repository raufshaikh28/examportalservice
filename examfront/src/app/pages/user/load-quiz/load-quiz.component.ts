import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent  implements OnInit{

  catId:any;
  quizzes:any;
  constructor(
    private _route:ActivatedRoute,
    private _quizSer:QuizService
  ){}
  ngOnInit(): void {

    this._route.params.subscribe(
      (params:any)=>{
        this.catId=params.catId;
        console.log(this.catId);


        if(this.catId==0){
          console.log('Load All the quiz');
          this._quizSer.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);
              console.log('All Quizzes loaded');
            },
            (error)=>{
              console.log(error);
              alert('Error in loading Quizes');
            }
          )
        }else{
          console.log('Load Specific Quiz')
          this._quizSer.getActiveQuizesOfCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log(data);
              console.log('Specific type of Quizzes loaded');

            },
            (error)=>{
              console.log(error);
              Swal.fire('Error','Something Went Wrong!! Error in Loading data','error');
            }
          )
        }

      }
    )
  }

}
