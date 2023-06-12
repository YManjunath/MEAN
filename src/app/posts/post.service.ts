import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:Post[] = [];
  private postsUpdated = new Subject<Post[]>();


  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(post:Post){
    const posts:Post = {title: post.title, content:post.content};

    this.posts.push(posts);
    this.postsUpdated.next([...this.posts])
  }


}
