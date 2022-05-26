import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  profile!:FormGroup
  genders=['Male', 'Female', 'Other', 'Rather Not say']
  unUsernames:string[]=['Benjamin', 'Dennis', 'Fredrick', 'Ashina', 'Edwin']
  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
    this.profile= this.fb.group({
      name:['' , [Validators.required, this.unallowedUsernames.bind(this)]],
      contactInfo:this.fb.group({
        email:['',[Validators.required,Validators.email],this.checkEmail],
        phone:['',[Validators.required,  Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(10),]]
      }),
      course:['',[Validators.required, this.selectCourse]],
      bio:['',Validators.required],
      gender:['',Validators.required],
      hobbies:this.fb.array([])
    })
  }

  onSubmit(){
    console.log(this.profile);
    console.log(this.profile.value);
    this.profile.reset()
    
  }

  addHobby(){
    const control = this.fb.control('', Validators.required);
    (<FormArray>this.profile.get('hobbies')).push(control)
  }

  getControls(){
   return  (<FormArray>this.profile.get('hobbies')).controls
  }

  remove(i:number){
    (<FormArray>this.profile.get('hobbies')).removeAt(i)
  }

  unallowedUsernames(control:FormControl):{[s:string]:boolean} |null{
      if(this.unUsernames.includes(control.value)){
        return {'Disallowed':true}
      }
      return null
  }

  selectCourse(control:FormControl):{[s:string]:boolean} |null{
    if(control.value==='sl'){
      return {'noCourseSelected':true}
    }
    return null
}

checkEmail(control:FormControl):Promise<any> |Observable<any> |null{
 const promise= new Promise((resolve, reject)=>{
   setTimeout(()=>{
     if(control.value === 'test@gmail.com'){
       resolve({'UnallowedEmail':true})
     }
     else{
       resolve(null)
     }
   }, 3500)
 })

 return promise
}

setValue(){
  this.profile.patchValue({
    name:['Jonathan'],
    contactInfo:({
      email:['jonathan@gmail.com'],
      phone:['0712584549']
    }),
    course:['Javascript'],
    bio:['Bio...'],
    gender:['Other'],

  })
}

}
