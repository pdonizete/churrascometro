// @ts-ignore

import { Component, OnInit } from '@angular/core';
import { ChurrascometroService } from '../shared/services/churrascometro.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-preco-formulario',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatStepperModule, FormsModule, ReactiveFormsModule],
  templateUrl: './preco-formulario.component.html',
  styleUrl: './preco-formulario.component.scss'
})
export class PrecoFormularioComponent implements OnInit {
  // formulÃ¡rio
  formPessoas!: FormGroup;
  formCarnes!: FormGroup;
  formBebidas!: FormGroup;

  carnesLista = [
    { value: 'picanha', label: 'Picanha' },
    { value: 'costela', label: 'Costela' },
    { value: 'linguica', label: 'Linguiça' },
    { value: 'frango', label: 'Frango' },
  ];

  bebidasLista = [
    { value: 'cerveja', label: 'Cerveja' },
    { value: 'refrigerante', label: 'Refrigerante' },
    { value: 'agua', label: 'Ãgua' },
    { value: 'suco', label: 'Suco' },
  ];

  exibirLoading = false;
  exibirResultados = false;

  // valores de referÃªncia
  preco_picanha = 0;
  preco_costela = 0;
  preco_linguica = 0;
  preco_frango = 0;

  consumo_adulto_picanha = 0;
  consumo_crianca_picanha = 0;
  consumo_adulto_costela = 0;
  consumo_crianca_costela = 0;
  consumo_adulto_linguica = 0;
  consumo_crianca_linguica = 0;
  consumo_adulto_frango = 0;
  consumo_crianca_frango = 0;

  preco_cerveja = 0;
  preco_refrigerante = 0;
  preco_agua = 0;
  preco_suco = 0;

  consumo_adulto_cerveja = 0;
  consumo_adulto_refrigerante = 0;
  consumo_crianca_refrigerante = 0;
  consumo_adulto_agua = 0;
  consumo_crianca_agua = 0;
  consumo_adulto_suco = 0;
  consumo_crianca_suco = 0;

  // nome: string = '';

  // valores totais
  adultos_total = 0;
  criancas_total = 0;

  valor_total_picanha = 0;
  valor_total_costela = 0;
  valor_total_linguica = 0;
  valor_total_frango = 0;

  valor_total_cerveja = 0;
  valor_total_refrigerante = 0;
  valor_total_agua = 0;
  valor_total_suco = 0;

  valor_total = 0;


  constructor(
    private churrascometroService: ChurrascometroService,
    private formBuilder: FormBuilder
  ) {
    this.formPessoas = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(0)]),
      criancas: new FormControl(null)
    });

    this.formCarnes = this.formBuilder.group({
      picanha: new FormControl(null),
      costela: new FormControl(null),
      linguica: new FormControl(null),
      frango: new FormControl(null)
    });

    this.formBebidas = this.formBuilder.group({
      cerveja: new FormControl(null),
      refrigerante: new FormControl(null),
      agua: new FormControl(null),
      suco: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.inicializarService();
    // this.churrascometroService.getPrecoPicanha()
    //   .subscribe(
    //     {
    //       next: (resultado) => {
    //         console.log(resultado);
    //         this.preco_kg_picanha = resultado;
    //       },

    //       error: (err) => {
    //         console.log(err);
    //       }
    //     }
    //   )

    // this.churrascometroService.getPrecoPicanha()
    //   .subscribe((resultado) => {
    //     console.log(resultado);
    //   })
  }

  inicializarService(): void {
    this.churrascometroService.getCarnes().pipe(
      map(carnes => {
        carnes.forEach(carne => {
          switch (carne.nome) {
            case 'picanha':
              this.preco_picanha = carne.preco_kg;
              this.consumo_adulto_picanha = carne.consumo_medio_adulto_g;
              this.consumo_crianca_picanha = carne.consumo_medio_crianca_g;
              break;
            case 'costela':
              this.preco_costela = carne.preco_kg;
              this.consumo_adulto_costela = carne.consumo_medio_adulto_g;
              this.consumo_crianca_costela = carne.consumo_medio_crianca_g;
              break;
            case 'linguiça':
              this.preco_linguica = carne.preco_kg;
              this.consumo_adulto_linguica = carne.consumo_medio_adulto_g;
              this.consumo_crianca_linguica = carne.consumo_medio_crianca_g;
              break;
            case 'frango':
              this.preco_frango = carne.preco_kg;
              this.consumo_adulto_frango = carne.consumo_medio_adulto_g;
              this.consumo_crianca_frango = carne.consumo_medio_crianca_g;
              break;
          }
        });
      })
    ).subscribe();

    this.churrascometroService.getBebidas().pipe(
      map(bebidas => {
        bebidas.forEach(bebida => {
          switch (bebida.nome) {
            case 'cerveja':
              this.preco_cerveja = bebida.preco_unidade;
              this.consumo_adulto_cerveja = bebida.consumo_medio_adulto_ml;
              break;
            case 'refrigerante':
              this.preco_refrigerante = bebida.preco_unidade;
              this.consumo_adulto_refrigerante = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_refrigerante = bebida.consumo_medio_crianca_ml;
              break;
            case 'água':
              this.preco_agua = bebida.preco_unidade;
              this.consumo_adulto_agua = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_agua = bebida.consumo_medio_crianca_ml;
              break;
            case 'suco':
              this.preco_suco = bebida.preco_unidade;
              this.consumo_adulto_suco = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_suco = bebida.consumo_medio_crianca_ml;
              break;
          }
        });
      })
    ).subscribe();
  }

  // onSubmit(): void {
  //   const name = this.nome;
  //   console.log('Nome submetido: ' + name);
  // }

  submit(): void {
    if (this.formPessoas.valid && this.formCarnes.valid && this.formBebidas.valid) {

      this.exibirLoading = true;

      const formPessoasValues = this.formPessoas.value;
      const formCarnesValues = this.formCarnes.value;
      const formBebidasValues = this.formBebidas.value;

      console.log(formPessoasValues);
      console.log(formCarnesValues);
      console.log(formBebidasValues);

      // const adultos = this.formPessoas.get('adultos')?.value;
      // const adultos = this.formPessoas.controls['adultos']?.value;
      const adultos = formPessoasValues.adultos;
      const criancas = formPessoasValues.criancas;

      const picanha = formCarnesValues.picanha;
      const costela = formCarnesValues.costela;
      const linguica = formCarnesValues.linguica;
      const frango = formCarnesValues.frango;

      const cerveja = formBebidasValues.cerveja;
      const refrigerante = formBebidasValues.refrigerante;
      const agua = formBebidasValues.agua;
      const suco = formBebidasValues.suco;

      if (adultos) {
        this.adultos_total = adultos;
      }

      if (criancas) {
        this.criancas_total = criancas;
      }

      if (picanha) {
        const consumo = (adultos * this.consumo_adulto_picanha) + (criancas + this.consumo_crianca_picanha);
        this.valor_total_picanha = consumo / 1000 * this.preco_picanha;
      }
      if (costela) {
        const consumo = (adultos * this.consumo_adulto_costela) + (criancas + this.consumo_crianca_costela);
        this.valor_total_costela = consumo / 1000 * this.preco_costela;
      }
      if (linguica) {
        const consumo = (adultos * this.consumo_adulto_linguica) + (criancas + this.consumo_crianca_linguica);
        this.valor_total_linguica = consumo / 1000 * this.preco_linguica;
      }
      if (frango) {
        const consumo = (adultos * this.consumo_adulto_frango) + (criancas + this.consumo_crianca_frango);
        this.valor_total_frango = consumo / 1000 * this.preco_frango;
      }
    

      if (cerveja) {
        const consumo = (adultos * this.consumo_adulto_cerveja);
        this.valor_total_cerveja = consumo / 1000 * this.preco_cerveja;
      }
      if (refrigerante) {
        const consumo = (adultos * this.consumo_adulto_refrigerante) + (criancas + this.consumo_crianca_refrigerante);
        this.valor_total_refrigerante = consumo / 1000 * this.preco_refrigerante;
      }
      if (agua) {
        const consumo = (adultos * this.consumo_adulto_agua) + (criancas + this.consumo_crianca_agua);
        this.valor_total_agua = consumo / 1000 * this.preco_agua;
      }
      if (suco) {
        const consumo = (adultos * this.consumo_adulto_suco) + (criancas + this.consumo_crianca_suco);
        this.valor_total_suco = consumo / 1000 * this.preco_suco;
      }

      this.valor_total = this.valor_total_picanha + this.valor_total_cerveja+ this.valor_total_costela + this.valor_total_linguica + this.valor_total_frango + this.valor_total_refrigerante + this.valor_total_agua + this.valor_total_suco;

      setTimeout(() => {
        this.exibirLoading = false;
        this.exibirResultados = true;
      }, 2000);
    }
  }
  gerarPDF(): void {
    const element = document.getElementById('relatorio');
    if (element) {
      const pdf = new jsPDF();
      pdf.html(element, {
        callback: (pdf) => {
          pdf.save('churrascometro.pdf');
        }
        
      });
    }
  }
  
}
