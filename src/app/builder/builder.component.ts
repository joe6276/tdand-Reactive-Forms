import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
  profile!:FormGroup
  genders=['Male', 'Female', 'Other', 'Rather Not say']
  unUsernames:string[]=['Benjamin', 'Dennis', 'Fredrick', 'Ashina', 'Edwin']
  constructor( private fb :FormBuilder) { }

  ngOnInit(): void {

    this.profile= this.fb.group({
      name: ['', [Validators.required,this.unallowedUsernames.bind(this)]],
      course:['', [Validators.required, this.unallowedCourse.bind(this)]],
      gender:['Male', Validators.required],
      bio:  ['', Validators.required],
      contactInfo:this.fb.group({
        email:['', [Validators.required,Validators.email], this.checkEmails],
        phone:['', [Validators.required ,Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]]
      }),
      hobbies:this.fb.array([])
    })

  }


  onSubmit(){
    console.log(this.profile);
    
    console.log(this.profile.value);
    
  }
  getControls(){
    return (<FormArray>this.profile.get('hobbies')).controls
  }
  addHobby(){
    const control= this.fb.control('', Validators.required);
    (this.profile.get('hobbies') as FormArray).push(control);
  }
  remove(i:number){
    (<FormArray>this.profile.get('hobbies')).removeAt(i)
  }
  unallowedUsernames(control:FormControl):{[sjn:string]:boolean}|null{
    if(this.unUsernames.includes(control.value)){
      return{'DisallowedUsername':true}
    }
    return null
  }


  unallowedCourse(control:FormControl):{[sjn:string]:boolean}|null{
    if(control.value==='sl'){
      return{'Disallowed':true}
    }
    return null
  }


  checkEmails(control:FormControl): Promise<any>|Observable<any>|null{
    const promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
    if(control.value==='test@gmail.com'){
      resolve({'Disallowed Email':true})
    }else{
      resolve(null)
    }
    },1500)
    
    })
    return promise
    

}

}
