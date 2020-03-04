import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../post/posts.model';

@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPost() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getpostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  createPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        alert(responseData.message);
      });

  }
}
