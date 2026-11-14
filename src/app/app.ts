import {Component} from '@angular/core';
import {Navbar} from '../ui/navbar/navbar';
import {Footer} from '../ui/footer/footer';
import {RouterOutlet} from '@angular/router';


@Component({
  imports: [
    Navbar,
    Footer,
    RouterOutlet
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
