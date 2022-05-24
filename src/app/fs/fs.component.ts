import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.css']
})
export class FsComponent implements OnInit {
  genders=['Male', 'Female', 'Other', 'Rather Not say']

  profile!:FormGroup
  constructor() { }
  unallowedUsername:string[]=['Test', 'He', 'She']
  ngOnInit(): void {
    this.profile= new FormGroup({ 
      'name'    :new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)] ),
      'gender'  :new FormControl('Male',Validators.required),
      'course'  :new FormControl(null,Validators.required),
      'bio'     :new FormControl(null,Validators.required),
      'contactInfo':new FormGroup({
        'email'   :new FormControl(null,[Validators.required, Validators.email], 
          <AsyncValidatorFn>this.forbiddenEmail),
        'phone'   :new FormControl(null,Validators.required)
      }),
      'hobbies':new FormArray([])
    })

    // this.profile.valueChanges.subscribe((value)=>{
    //   console.log(value);
      
    // })
    // this.profile.statusChanges.subscribe(changes=>{
    //   console.log(changes);
      
    // })

    // this.profile.setValue({
    //   'name':'Jonathan',
    //   'gender'  :'Male',
    //   'course'  :'java',

    //   'bio':'HEre',

    //   'hobbies':[],

    //   'contactInfo':{
    //     'email':'jojo@gmail.com',
    //     'phone':'432432'
    //   }

    // })
    this.profile.patchValue({
          'gender'  :'Female',
      'course'  :'java',
    })
  }
onSubmit(){
console.log(this.profile);
}


addHobby(){
const control= new FormControl(null, Validators.required);
(<FormArray>this.profile.get('hobbies')).push(control)
}

getControls() {
  return (<FormArray>this.profile.get('hobbies')).controls;
}
remove(i:number){
  (<FormArray>this.profile.get('hobbies')).removeAt(i)
}

forbiddenNames(control:FormControl):{[s:string]:boolean} |null {
if(this.unallowedUsername.indexOf(control.value)==1){
  return {'unallowed':true}
}
return null 
}

forbiddenEmail(control:FormControl): Promise<any>|Observable<any>|null{
const promise=new Promise((resolve,reject)=>{
setTimeout(()=>{
if(control.value==='joe@gmail.com'){
  resolve({'Disallowed Email':true})
}else{
  resolve(null)
}
},1500)

})
return promise
}

}
