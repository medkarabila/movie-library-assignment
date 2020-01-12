import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import * as Globals from '../globals';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;
  @Output() deleted = new EventEmitter<number>();
  backup = {
    id: <number> 0,
    title: <string> '',
    director: <string> '',
    releaseDate: <string> '',
    type: <string> ''
  };

  onUpdate(ok) {
    const cardContent = Array.from(document.querySelectorAll('#movie-card-' + this.movie.id + ' > div'));
    cardContent.forEach(element => element.classList.toggle('hidden'));
    if (!ok) {
      this.movie.id = this.backup.id;
      this.movie.title = this.backup.title;
      this.movie.director = this.backup.director;
      this.movie.releaseDate = this.backup.releaseDate;
      this.movie.type = this.backup.type ;
    }
  }

  showEditForm(event) {
    document.getElementById('movie-edit-form-' + this.movie.id).classList.toggle('hidden');
    const cardContent = Array.from(document.querySelectorAll('#movie-card-' + this.movie.id + ' > div'));
    cardContent.forEach(element => element.classList.toggle('hidden'));
    this.backup.id = this.movie.id;
    this.backup.title = this.movie.title;
    this.backup.director = this.movie.director;
    this.backup.releaseDate = this.movie.releaseDate;
    this.backup.type = this.movie.type;
  }
  sendDelete(event) {
    const url = Globals.baseUrl + this.movie.id;
    fetch(url, {
      method: 'DELETE',
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if (data === 'OK') {
          this.deleted.emit(this.movie.id);
        }
      });
  }
  constructor() { }

  ngOnInit() {
  }

}
