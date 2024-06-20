import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import pt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginService } from './shared/services/login.service';
import { StorageService } from './shared/services/storage.service';

registerLocaleData(pt);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt'
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'churrascometro';


  constructor() {
    
  }

  
}
