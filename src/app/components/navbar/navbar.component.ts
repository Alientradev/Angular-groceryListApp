import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logoImg = '../../../assets/images/logo.png';
  angularLogo = '../../../assets/logos/angular.webp';
  firebaseLogo = '../../../assets/logos/firebase.webp';

  constructor() { }

  ngOnInit(): void {
  }

}
