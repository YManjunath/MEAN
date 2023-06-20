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


  constructor(private postService:PostService){

  }

  addPost(form:NgForm){
    if(form.invalid){
      return;
    }
    const post: Post = {
      id:null,
      title:form.value.enteredTitle,
      content: form.value.enteredContent
    }
    this.postService.addPosts(post);
    form.resetForm();
  }

}
