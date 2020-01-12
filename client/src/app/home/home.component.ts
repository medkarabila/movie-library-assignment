import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'Welcome to movie library assignment';
  subTitle = 'This is a small project to manage movies';

  constructor() {}

  ngOnInit() {}

}
