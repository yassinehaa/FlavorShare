import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class NavbarComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.updateQuery(value.trim());
  }
}
