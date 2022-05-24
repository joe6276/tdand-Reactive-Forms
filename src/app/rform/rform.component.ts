import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {
  genders=['Male', 'Female', 'Other', 'Rather Not say']
  profile!:FormGroup
  unUsernames:string[]=['Benjamin', 'Dennis', 'Fredrick', 'Ashina', 'Edwin']
  constructor() { }

  ngOnInit(): void {
    this.profile= new FormGroup({
      'name': new FormControl(null,[Validators.required,this.unallowedUsernames.bind(this)]), 
      'course':new FormControl(null,Validators.required),
      'gender':new FormControl('Male',Validators.required),
      'bio':  new FormControl(null,Validators.required),
      'contactInfo':new  FormGroup({
        'email':new FormControl(null,[Validators.required,Validators.email], <AsyncValidatorFn>this.checkEmails),
        'phone':new FormControl(null,Validators.required),
      }),
      'hobbies':new FormArray([])
    })
    // this.profile.statusChanges.subscribe(status=>{
    //   console.log(status);
    // })

    // this.profile.setValue({
    //   'name':"Jonathan",
    //   'course':'java',
    //   'gender':'Male',
    //   'bio':'Herehf',
    //   'hobbies':[],
    //   'contactInfo':{
    //     'email':'Johndoe@gmail.com',
    //     'phone':'243434'
    //   }
    // })

    //  this.profile.patchValue({
    //   'name':"Jonathan",
    //   'course':'java'})
  }

  onSubmit(){
    console.log(this.profile)

    console.log(this.profile.value);
    
    this.profile.reset()
  }


  addHobby(){
    const control= new FormControl(null, Validators.required);
    (this.profile.get('hobbies') as FormArray).push(control);
  }
  getControls(){
    return (<FormArray>this.profile.get('hobbies')).controls
  }
  remove(i:number){
    return (<FormArray>this.profile.get('hobbies')).removeAt(i)
  }


  unallowedUsernames(control:FormControl):{[sjn:string]:boolean}|null{
    if(this.unUsernames.includes(control.value)){
      return{'DisallowedUsername':true}
    }
    return null
  }


  checkEmails(control:FormControl):Promise<any>|Observable<any> |any{
    const promise=new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@gmail.com'){
          resolve({'unallowed':true})
        }
        else{
          resolve(null)
        }
      },3000)    
   
    })
  return promise
  }
}
