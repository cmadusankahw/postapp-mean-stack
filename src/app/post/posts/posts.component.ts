import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../posts.service';
import { Post } from '../posts.model';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  isLoading = false;
  btntxt = 'Create Post';
  loadedPost: Post;

  //snackbar
  durationInSeconds = 5;


  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');

        //spinner
        this.isLoading = true;
        this.postService.getEditPost(this.postId).subscribe(postData => {

          //spinner
          this.isLoading = false;
          this.loadedPost = { id: postData._id, title: postData.title, content: postData.content };
          this.btntxt = 'Update Post';
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.btntxt = 'Create Post';
      }
    });
  }





  createPost(postForm: NgForm) {
    if (postForm.invalid) {
      alert('Required fileds are not set! Please check!');
      return;
    }

    if (this.mode === 'edit') {

      //spinner
      this.isLoading = true;
      this.postService.updatePost(this.postId, postForm.value.title, postForm.value.content);
    } else {

      //spinner
      this.isLoading = true;
      this.postService.createPost(postForm.value.title, postForm.value.content);
    }

    postForm.resetForm();
  }


}
