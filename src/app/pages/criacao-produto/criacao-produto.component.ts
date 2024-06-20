import { Component, Input } from '@angular/core';
import { ProdutoFormularioComponent } from '../../shared/components/produto-formulario/produto-formulario.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';

@Component({
  selector: 'app-criacao-produto',
  standalone: true,
  imports: [ProdutoFormularioComponent],
  templateUrl: './criacao-produto.component.html',
  styleUrl: './criacao-produto.component.scss'
})
export default class CriacaoProdutoComponent {

  paramID!: string;
  paramProduto!: string;
  @Input() set id(id: string) {
    this.paramID = id;
  }
  @Input() set produto(produto: string) {
    this.paramProduto = produto;
  }


}
