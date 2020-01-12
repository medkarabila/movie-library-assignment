import { Component } from '@angular/core';
import { Movie } from '../movie';
import { HttpClient } from '@angular/common/http';
import * as Globals from '../globals';

@Component({
  selector: 'app-movie-listings',
  templateUrl: './movie-listings.component.html',
  styleUrls: ['./movie-listings.component.css']
})

export class MovieListingsComponent {
  allMovies = [];

  newMovie = {
    id: <number> 0,
    title: <string> '',
    director: <string> '',
    releaseDate: <string> '',
    type: <string> ''
  };

  sortBy(event) {
    switch (event.target.value) {
      case 'Title':
        this.allMovies.sort( (a: Movie, b: Movie) => b.title.toLowerCase() < a.title.toLowerCase() ? 1 : -1 );
        break;
      case 'Director':
        this.allMovies.sort( (a: Movie, b: Movie) => b.director.toLowerCase() < a.director.toLowerCase() ? 1 : -1 );
        break;
      case 'Release Date':
        this.allMovies.sort( (a: Movie, b: Movie) => {
          const [bDay, bMonth, bYear] = b.releaseDate.split('/');
          const bDate: Date = new Date(parseInt(bYear, 10), parseInt(bMonth, 10) - 1, parseInt(bDay, 10));
          const [aDay, aMonth, aYear] = a.releaseDate.split('/');
          const aDate: Date = new Date(parseInt(aYear, 10), parseInt(aMonth, 10) - 1, parseInt(aDay, 10));
          const result: number = bDate < aDate ? 1 : -1;
          return result;
        });
        break;
      case 'Type':
        this.allMovies.sort( (a: Movie, b: Movie) => b.type.toLowerCase() < a.type.toLowerCase() ? 1 : -1 );
        break;
      default:
        this.allMovies.sort( (a: Movie, b: Movie) => b.id < a.id ? 1 : -1 ); // This never gets called...
        break;
    }
  }

  search(event) {
    event.preventDefault();
    const searchString: string = (<HTMLInputElement>document.getElementById('search')).value.toLowerCase();
    const allCards: Array<HTMLElement> = Array.from(document.querySelectorAll('app-movie-card'));
    if (searchString === '') {
      allCards.forEach(card => card.classList.remove('hidden'));
    } else {
      allCards.forEach(card => {
        if (!card.textContent.toLowerCase().includes(searchString)) {
          card.classList.add('hidden');
        } else {
          card.classList.remove('hidden');
        }
      });
    }
  }

  showCreateForm(event) {
    document.getElementById('movie-create-form').classList.toggle('hidden');
    event.target.classList.toggle('hidden');
  }

  onDelete(deleted) {
    const deletedMovieIndex: number = this.allMovies.findIndex((movie) => movie.id === deleted);
    if (deletedMovieIndex > -1) {
      this.allMovies.splice(deletedMovieIndex, 1);
    }
  }

  onCreate(event) {
    if (!Globals.isValidDate(this.newMovie.releaseDate)) {
      return;
    }
    const url: string = Globals.baseUrl;
    fetch(url, {
      body: JSON.stringify(this.newMovie),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if (data) {
          console.log(data);
          document.getElementById('movie-create-form').classList.toggle('hidden');
          document.getElementById('btn-movie-new').classList.toggle('hidden');
          this.allMovies.push(new Movie(
            data,
            this.newMovie.title,
            this.newMovie.director,
            this.newMovie.releaseDate,
            this.newMovie.type
          ));
          this.newMovie = {
            id: <number> 0, // This does not matter now that the id is determined by the server
            title: <string> '',
            director: <string> '',
            releaseDate: <string> '',
            type: <string> ''
          };
        } else {
          console.log('Unable to create entry');
        }
      });
  }

  onCancel(event) {
    document.getElementById('movie-create-form').classList.toggle('hidden');
    document.getElementById('btn-movie-new').classList.toggle('hidden');
  }

  constructor(private http: HttpClient) {
    http.get(Globals.baseUrl).subscribe(data => {
      const props: Array<string> = Object.keys(data);
      for (const prop of props) {
        this.allMovies.push(new Movie(data[prop].id, data[prop].title, data[prop].director, data[prop].releaseDate, data[prop].type));
      }
      this.newMovie.id = this.allMovies.length;
    });
  }

}
