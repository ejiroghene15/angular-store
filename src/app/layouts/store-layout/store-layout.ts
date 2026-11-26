import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../../ui/navbar/navbar';
import {Footer} from '../../../ui/footer/footer';

@Component({
  imports: [Navbar, Footer, RouterOutlet],
  selector: 'app-store-layout',
  styleUrl: './store-layout.css',
  templateUrl: './store-layout.html',
})
export class StoreLayout {}
