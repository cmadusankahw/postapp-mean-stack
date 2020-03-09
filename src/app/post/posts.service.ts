import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Post } from '../post/posts.model';
import { Router } from '@angular/router';
import { PostsComponent } from './posts/posts.component';


@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  //snackbar
  openSnackBar(message) {
    this._snackBar.open(message);
  }

  getPost() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getpostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getEditPost(postId: string) {

    return this.http.get<{ _id: string, title: string, content: string }>(
      'http://localhost:3000/api/posts/' + postId
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http.put<{ message: string }>('http://localhost:3000/api/posts/' + id, post)
      .subscribe(responseData => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
        this.openSnackBar(responseData.message);
      }
      );
  }

  createPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
        this.openSnackBar(responseData.message);
      });

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

}
