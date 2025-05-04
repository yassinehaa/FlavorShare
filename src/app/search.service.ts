import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private query = new BehaviorSubject<string>('');
  currentQuery = this.query.asObservable();

  updateQuery(q: string) {
    this.query.next(q.toLowerCase());
  }
}
