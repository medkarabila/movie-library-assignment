import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from '../movie';
import * as Globals from '../globals';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  @Input() movie: Movie;
  @Output() done = new EventEmitter<boolean>();

  onSave(event) {
    if (!Globals.isValidDate(this.movie.releaseDate)) {
      return;
    }
    document.getElementById('movie-edit-form-' + this.movie.id).classList.toggle('hidden');
    const updatedMovie = {
      id: <number> this.movie.id,
      title: <string> this.movie.title,
      director: <string> this.movie.director,
      releaseDate: <string> this.movie.releaseDate,
      type: <string> this.movie.type
    };
    fetch(Globals.baseUrl + this.movie.id, {
      body: JSON.stringify(updatedMovie),
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => this.done.emit(true));
  }

  onCancel(event) {
    document.getElementById('movie-edit-form-' + this.movie.id).classList.toggle('hidden');
    this.done.emit(false);
  }
  constructor() { }

}
