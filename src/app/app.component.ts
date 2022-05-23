import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders=['Male', 'Female', 'Other', 'Rather Not say']
  @ViewChild('form') form!:NgForm
  onSubmit(){
    console.log(this.form);

    console.log({

      name:this.form.value.name,
      gender:this.form.value.gender,
      course:this.form.value.course,
      bio:this.form.value.bio,
      email:this.form.value.contactInfo.email,
      phone:this.form.value.contactInfo.phone
    });
    
    this.form.resetForm()
  }
  populate(){
    // this.form.setValue({
    //   bio: "This is my Bio",
    //   contactInfo: {
    //     email: 'john@gmail.com',
    //      phone: '0700000000'
    //     },
    //   course: "c+",
    //   gender: "Male",
    //   name: "John Doe"
    // })

    this.form.form.patchValue({
      contactInfo: {
            email: 'john@gmail.com',
             phone: '0700000000'
            }
    })
  }
}
