import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  public mode = 'create';
  private postId :string;
  post:any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      const _id = paramMap.get('postId')
      if(_id){
        this.mode = 'edit';
        this.postId = _id;
        this.post = this.postService.getPost(this.postId);
        /*this.postService.getPost(this.postId).subscribe(res => {
          this.post = res;
        });*/
      } else {
        this.mode = 'create';
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: '',
      title: form.value.enteredTitle,
      content: form.value.enteredContent,
    };
    if(this.mode === 'create'){
      this.postService.addPosts(post);
    } else {
      this.postService.updatePost(this.postId, post)
    }
    form.resetForm();
  }
}
