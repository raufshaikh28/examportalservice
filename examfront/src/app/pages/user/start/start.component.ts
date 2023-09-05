import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  qid:any;
  questions:any;
  marksGot = 0;
  correctAnswer = 0;
  attempted =0;
  isSubmit=false;
  timer:any;
  constructor(
    private locationSt:LocationStrategy,
    private _rout:ActivatedRoute,
    private queService:QuestionService
  ){}
  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._rout.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions(){
    this.queService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.questions=data;

        this.timer=this.questions.length * 2 * 60;

        console.log(data);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Something Went Wrong!! During Loading Questions!!','error');
      }
    );
  }

  ///////////prevent from back
  preventBackButton(){
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);

    }

    )
  }

  //
  submitQuiz(){

    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'question'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
    })

  }

  evalQuiz(){

    //Call to server to  evaluate quetions answers

    this.queService.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer=data.correctAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
      }
    );


    // this.isSubmit=true;
    // this.questions.forEach((q: any)=>{

    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswer++;
    //     let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if(q.givenAnswer.trim()!=''){
    //     this.attempted++;
    //   }
    // })
    
    // console.log("Correct ans :"+this.correctAnswer);
    // console.log("Marks Got :"+this.marksGot);
    // console.log("Attempted Got :"+this.attempted);

  }
///////////////////////////////
  startTimer(){
    let t=window.setInterval(()=>{

      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }
//////////////////////////////
  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  } 

  printPage(){
    window.print();
  }

}
