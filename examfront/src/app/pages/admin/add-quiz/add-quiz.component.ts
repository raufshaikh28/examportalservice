import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    noOfQuestions:'',
    active:true,
    category:{
      cid:null,
      title:'',
      description:''
    }
  };

  categories=[
    {
      cid:null,
      title:'',
      description:''
    }
  ]

  constructor(
    private _category:CategoryService,
    private _snack:MatSnackBar,
    private _quizSer:QuizService
    ){}
  ngOnInit(): void {
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
  }

  addQuiz(){
    if(this.quizData.title.trim()==''||this.quizData.title==null){
      this._snack.open('Title Required','',{
        duration:2500
      });
      return;
    }
    //validation
    //calling server
    this._quizSer.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success',this.quizData.title+' Quiz is Added Successfully','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          noOfQuestions:'',
          active:true,
          category:{
            cid:null,
            title:'',
            description:''
          }
        };
        },
      (error)=>{
        Swal.fire('Error','Something Went Wrong!!','error');
        // console.log(error);
        // this.quizData={
        //   title:'',
        //   description:'',
        //   maxMarks:'',
        //   noOfQuestion:'',
        //   active:true,
        //   category:null
        // };
      }
    );
  }

}
