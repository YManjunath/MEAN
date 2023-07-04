import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  imagePreview:string;
  post:any;
  isLoading:boolean = false;
  form:FormGroup;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl('', {validators: [Validators.required]}),
      image: new FormControl('', {validators: [Validators.required]}),
    })
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      const _id = paramMap.get('postId')
      if(_id){
        this.mode = 'edit';
        this.postId = _id;
        this.post = this.postService.getPost(this.postId);
        /*this.postService.getPost(this.postId).subscribe(res => {
          this.post = res;
        });*/
        
        this.post && this.post.length >=0 ? this.form.setValue({title: this.post.title, content: this.post.content}) : '';
      } else {
        this.mode = 'create';
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      id: '',
      title: this.form.value.title,
      content: this.form.value.content,
    };
    if(this.mode === 'create'){
      this.postService.addPosts(post);
    } else {
      this.postService.updatePost(this.postId, post)
    }
    this.form.reset();
  }

  onImagePicked(event: Event){
    const file =  (event.target as HTMLInputElement).files
    if(file && file){
      this.form.patchValue({image:file[0]});
      this.form.get('image')?.updateValueAndValidity();
    };
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    if(file && file.length){
      reader.readAsDataURL(file[0]);
    }
    
  }
}
