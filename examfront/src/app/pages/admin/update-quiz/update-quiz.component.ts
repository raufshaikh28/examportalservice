import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  
  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _category:CategoryService,
    private _snack:MatSnackBar,
    private router:Router
    ){}

  qId=0;
  quiz: any;

  categories=[
    {
      cid:null,
      title:'',
      description:''
    }
  ]

  ngOnInit(): void {

    //category
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Error in Loading data','error');
      }
    );

    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
      );
  }

  //update form
  public updateData(){

    //validate

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success!!','Quiz Update Successfully!!','success').then(
          (e)=>{
            this.router.navigate(['/admin/quizzes'])
          }
        );
      },
      (error)=>{
        Swal.fire('Error','Something Went Wrong During Updation','error');
        console.log(error);
      }
    );

  }


}
