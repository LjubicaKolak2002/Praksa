import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { UserPostsService } from '../services/user-posts.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent {

  getId: any;
  editUserForm: FormGroup;
  success = false;

  constructor(
    public service: UserPostsService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute)
    {
      this.getId = this.route.snapshot.paramMap.get('id');
      this.service.getUserById(this.getId).subscribe(res => {
        this.editUserForm.setValue({
          name: res['name'],
          email: res['email']
        });
    });

    this.editUserForm = this.formBuilder.group({
      name: [''],
      email: ['']
    })   
  }

  ngOnInit() { }
 
  onUpdate(): any {
    this.service.editUser(this.getId, this.editUserForm.value).subscribe({next:() => {
      this.success = true
    }})
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }    
}