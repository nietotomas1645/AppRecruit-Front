import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild(LoginComponent) LoginComponent!: LoginComponent;
  public isLoggedIn:any = false;

  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;
  constructor(private auth: AuthService) { }

  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }

  logout(){
    this.auth.signOut();
  }

 
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
