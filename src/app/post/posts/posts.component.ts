import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';

import { PostService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  constructor(public postService: PostService) { }

  ngOnInit() {
  }

  createPost(postForm: NgForm) {
    if (postForm.invalid) {
      alert('Required fileds are not set! Please check!');
      return;
    }
    this.postService.createPost( postForm.value.title , postForm.value.content );
    postForm.resetForm();
  }


}
