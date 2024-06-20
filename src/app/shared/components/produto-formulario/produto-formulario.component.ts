import { Component, Input, OnChanges, OnInit, effect } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TipoChurrasco } from '../../models/enums/tipoChurrasco.enum';
import { MatSelectModule } from '@angular/material/select';
import { TipoBebida } from '../../models/enums/tipoBebida.enum';

@Component({
  selector: 'app-produto-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './produto-formulario.component.html',
  styleUrl: './produto-formulario.component.scss'
})
export class ProdutoFormularioComponent implements OnInit {
  @Input() idRoute!: string;
  @Input() produtoRoute: string = 'carnes';

  campos!: any[];

  form!: FormGroup;

  listaTipoChurrasco: string[] = Object.values(TipoChurrasco);
  listaTipoBebida: string[] = Object.values(TipoBebida);

  // getProduto = this.servico.getProduto;

  constructor(
    private formBuilder: FormBuilder,
    private servico: ChurrascometroService,
    private route: Router
  ) {
    effect(() => {
      if (this.servico.getProduto() && this.idRoute) {
        this.form.patchValue(this.servico.getProduto());
        this.disableCrianca();
      }
    })
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    switch(this.produtoRoute) {
      case 'carnes':
        this.campos = [
          { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
          { nome: 'tipo', tipo: 'list', placeholder: 'Tipo' },
          { nome: 'preco_kg', tipo: 'number', placeholder: 'Preço por kg' },
          { nome: 'consumo_medio_adulto_g', tipo: 'number', placeholder: 'Consumo médio por adulto (g)' },
          { nome: 'consumo_medio_crianca_g', tipo: 'number', placeholder: 'Consumo médio por criança (g)' },
        ];
        break;
      case 'bebidas':
        this.campos = [
          { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
          { nome: 'tipo', tipo: 'list', placeholder: 'Tipo' },
          { nome: 'preco_unidade', tipo: 'number', placeholder: 'Preço por unidade' },
          { nome: 'consumo_medio_adulto_ml', tipo: 'number', placeholder: 'Consumo médio por adulto (ml)' },
          { nome: 'consumo_medio_crianca_ml', tipo: 'number', placeholder: 'Consumo médio por criança (ml)' },
        ];
    }

    this.campos.forEach((campo) => {
      this.addFormControl(campo.nome, [Validators.required])
    });

    if (this.idRoute) {
      console.log('ID', this.idRoute);
      this.servico.httpGetProduto(this.idRoute, this.produtoRoute).subscribe();
    }
  }

  disableCrianca(): void {
    console.log(this.form.get('tipo')?.value);
    if (this.form.get('tipo')?.value == TipoBebida.alcoolico) {
      this.form.get('consumo_medio_crianca_ml')?.disable();
      this.form.get('consumo_medio_crianca_ml')?.setValue('0');
    } else {
      this.form.get('consumo_medio_crianca_ml')?.enable();
      this.form.get('consumo_medio_crianca_ml')?.setValue('0');
    }
  }

  private addFormControl(fieldName: string, validators: any[] = []): void {
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }

  criar() {
    if (this.form.valid) {
      const produto = this.getProduto();

      if (produto) {
        this.servico.httpCreateProduto(produto, this.produtoRoute).subscribe({
          next: (retorno) => {
            this.form.reset();
            console.log(retorno);
          },
          error: (error) => console.error(error),
        })
      }
    }
  }

  editar() {
    if (this.form.valid) {
      const produto = this.getProduto();
      if (produto) {
        this.servico.httpUpdateProduto(this.idRoute, this.produtoRoute, produto).subscribe({
          next: (retorno: any) => {
            console.log('Editado', retorno);
            this.form.reset();
            this.route.navigate(['/home']);
          },
          error: (error) => console.error(error),
        });
      }
    }
  }

  deletar() {
    if (this.idRoute) {
      this.servico.httpDeleteProduto(this.idRoute, this.produtoRoute).subscribe({
        next: () => {
          console.log('Apagado');
          this.form.reset();
          this.route.navigate(['/home']);
          alert('Apagado');
        }, error: (error) => console.error(error)
      });
    }
  }

  private getProduto(): any {
    let produto!: any;

    // { nome: 'tipo', tipo: 'text', placeholder: 'Tipo' },
    this.campos.forEach((campo) => {
      const value = this.getValorFormControl(campo.nome); // Fruta

      if (value) {
        produto = {
          ...produto,
          [campo.nome]: campo.tipo === "number" ? parseFloat(value) : value // tipo: Fruta
        }
      }

    })

    return produto;
  }

  private getValorFormControl(nome: string): string | null {
    return this.form.get(nome)?.value;
  }
}
