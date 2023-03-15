import { Component, OnInit, Input } from '@angular/core';
import { UserPostsService } from '../services/user-posts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})

export class UserPostsComponent {
  posts:any;
  users:any;
   
  constructor(private service: UserPostsService,){} 

  ngOnInit() {
    this.service.getPosts().subscribe(response => { 
      this.posts = response;
    });
    this.service.getUsers().subscribe(response => {
      this.users = response;
    })
  }
}
