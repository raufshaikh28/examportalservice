import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor= ClassicEditor;

  qId:any;
  qTitle:any;
  question={
    quiz:{
      qId:null,
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };
  constructor(
    private _route:ActivatedRoute,
    private _quizSe:QuizService,
    private _question:QuestionService
  ){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    // console.log(this.qId);
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit(){
    // alert('testing');
    if(this.question.content.trim()=='' ||this.question.content==null){
      Swal.fire('Error','Please Enter the Question!!','question');
      return;
    }
    if(this.question.option1.trim()=='' ||this.question.option1==null){
      Swal.fire('Error','Please Enter the option1!!','question');
      return;
    }
    if(this.question.option2.trim()=='' ||this.question.option2==null){
      Swal.fire('Error','Please Enter the option2!!','question');
      return;
    }
    if(this.question.answer.trim()=='' ||this.question.answer==null){
      Swal.fire('Error','Please Enter the answer!!','question');
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Success','Question Added Successfully!! You Can Add another one',
        'success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';

      },
      (error)=>{
        Swal.fire('Error','Something Went Wrong While Adding Question!!','error');
      }
    )
  }
}
