import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService{
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private httpclient:HttpClient) { }
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.httpclient.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }
  addComment(comment: Omit<Comment, 'id'>): Observable<Comment> {
    return this.httpclient.post<Comment>(this.apiUrl, comment);
  }
  deleteComment(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
