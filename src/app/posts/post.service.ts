import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post:any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((res) => {
        this.posts = res;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id:string){
    return {...this.posts.find(post => post.id === id)}
  }

  /*getPost(id:string){
    return this.http.get<{post:Post[]}>(`http://localhost:3000/api/posts/${id}`);
  }*/

  addPosts(post: Post) {
    const posts: Post = { id: '', title: post.title, content: post.content };
    this.http
      .post<{ message: string, postId:string }>('http://localhost:3000/api/posts', posts)
      .subscribe((res) => {
        posts.id = res.postId;
        this.posts.push(posts);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id:string, post:Post){
    const posts: Post = { id: id, title: post.title, content: post.content };
    this.http.put(`http://localhost:3000/api/posts/${id}`, posts).subscribe((res)=>{
      console.log(res)
    })
  }


  deletePost(id:any){
    this.http.delete(`http://localhost:3000/api/posts/${id}`).subscribe((res)=>{
      const updatedPost = this.posts.filter(post => post.id !== id);
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
    }, (err)=>{
      console.log(err)
    });
  }
}
