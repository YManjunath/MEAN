import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // @Input() posts:Post[] = [];
  posts:Post[] = [];
  private postsSub:Subscription | undefined ;


  constructor(
    private postService: PostService
  ){
    
  }
  
  ngOnInit(){
    this.posts = this.postService.getPosts()
    this.postsSub = this.postService.getPostUpdateListener().subscribe((post:Post[]) => {
      this.posts = post
    })
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }
}
