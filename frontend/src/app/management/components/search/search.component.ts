import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchQuery = output<string>();
  
  onSearchQueryUpdated = (value: string): void => this.searchQuery.emit(value);
}
