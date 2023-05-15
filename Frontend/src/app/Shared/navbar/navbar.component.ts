import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public rol = localStorage.getItem('roleid') || null;
  public name = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.Data) {
      this.name = this.authService.Data.name +' ' +this.authService.Data.lastName || '';
    }
  }

  login(){
    const close = document.getElementById('closeCanvas');
    close?.click();
    this.router.navigateByUrl('/login');
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('roleid')
    localStorage.removeItem('data')
    this.name = "";
    this.rol = null;
    this.router.navigateByUrl('/');
  }
}
