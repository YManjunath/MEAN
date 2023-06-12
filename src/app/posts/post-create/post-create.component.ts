import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  enteredTitle = ""
  enteredContent = "";

  // @Output() postCreated = new EventEmitter<Post>();

  constructor(private postService:PostService){

  }

  addPost(form:NgForm){
    if(form.invalid){
      return;
    }
    const post: Post = {
      title:form.value.enteredTitle,
      content: form.value.enteredContent
    }
    // this.postCreated.emit(post);
    this.postService.addPosts(post);
  }

}
