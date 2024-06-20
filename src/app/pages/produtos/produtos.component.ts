import { Component } from '@angular/core';
import { ListaProdutoComponent } from '../../shared/components/lista-produto/lista-produto.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [ListaProdutoComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

}
