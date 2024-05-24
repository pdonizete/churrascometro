import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrecoFormularioComponent } from '../preco-formulario/preco-formulario.component';
import { ScrollService } from '../shared/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, PrecoFormularioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  welcomeMessage: string = 'Bem-vindo ao Churrascômetro!'

  // #scrollService = inject(ScrollService);

  constructor(private scrollService: ScrollService) { }

  rolarToSection(id: string): void {
    this.scrollService.scrollToTop(id);
  }
}
