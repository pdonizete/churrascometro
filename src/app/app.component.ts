import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import pt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './header/header.component';

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
}
