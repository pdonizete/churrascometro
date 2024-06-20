import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user!: string;
  pass!: string;

  constructor(
    public loginService: LoginService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login() {
    this.loginService.login(this.user, this.pass).subscribe({
      next: (res) => {
        console.log('Resposta Backend', res);
        this.storageService.doLogin(res.token, res.user, res.perfil);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logout() {
    if (!this.loginService.isLoggedIn()) return;
    this.loginService.logout().subscribe({
      next: () => {
        this.storageService.doLogout();
        this.router.navigate(['/home']);
      }, error: (err) => console.log(err)
    })
  }
}
