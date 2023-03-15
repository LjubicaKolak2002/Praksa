import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { UserPostsService } from '../services/user-posts.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
    userForm: FormGroup;
    success = false;
   
    constructor(
      private formBuilder: FormBuilder,
      private service: UserPostsService,
    ) 
    { 
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required]})
    }

    ngOnInit(){}

    onSubmit(){
      let formValue = this.userForm.value;
      this.service.addUser(formValue.name, formValue.email).subscribe({next:() => {
        this.success = true;
      }})
      this.userForm.reset();
    }
    
  }


