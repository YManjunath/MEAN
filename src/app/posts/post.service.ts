import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:Post[] = [];
  private postsUpdated = new Subject<Post[]>();


  constructor(private http: HttpClient) { }

  getPosts(){
    this.http.get<{ message:string, posts:Post[]}>('http://localhost:3000/api/posts').subscribe((res)=>{
      this.posts = res.posts;
      console.log(res)
      this.postsUpdated.next([...this.posts])
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(post:Post){
    const posts:Post = {id:null ,title: post.title, content:post.content};
    this.http.post<{message:string}>('http://localhost:3000/api/posts', posts).subscribe((res) => {
      console.log(res.message)
      this.posts.push(posts);
      this.postsUpdated.next([...this.posts])
    })
  }


}
