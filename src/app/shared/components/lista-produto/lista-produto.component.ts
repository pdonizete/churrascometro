import { Component, Input, OnInit } from '@angular/core';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { churrascosRoutes } from '../../../churrascos.routes';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss'
})
export class ListaProdutoComponent implements OnInit {
  @Input() produto!: string;

  items: any[] = [];

  constructor(
    private churrascometroService: ChurrascometroService,
    private router: Router) { }

  ngOnInit(): void {
      if (this.produto === 'carnes') {
        this.churrascometroService.httpGetCarnes().subscribe({
          next: (carnes) => {
            this.items = carnes;
          }
        });
      } else {
        this.churrascometroService.httpGetBebidas().subscribe({
          next: (bebidas) => {
            this.items = bebidas;
          }
        });
      }
  }

  navegarParaCriacao() {
    this.router.navigate([`produtos/${this.produto}`]);
  }

  navegarParaEdicao(id: any) {
    this.router.navigate([`produtos/${this.produto}`, id]);
  }
}
