import { Component } from '@angular/core';
import {CommentsService} from '../comments.service';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
constructor(commentsService: CommentsService) {

}
}
