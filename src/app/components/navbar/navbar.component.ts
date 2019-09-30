import {Component, OnInit} from '@angular/core';

/**
 * The NavbarComponent.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /** The main title of the navbar. */
  title = 'Todo application';

  ngOnInit() {
  }

}
