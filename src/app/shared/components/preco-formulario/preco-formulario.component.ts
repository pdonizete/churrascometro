// @ts-ignore
import jsPDF from 'jspdf';

import { Component, OnInit, effect } from '@angular/core';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { TipoChurrasco } from '../../models/enums/tipoChurrasco.enum';

@Component({
  selector: 'app-preco-formulario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  templateUrl: './preco-formulario.component.html',
  styleUrl: './preco-formulario.component.scss',
})
export class PrecoFormularioComponent implements OnInit {
  // formulário
  formPessoas!: FormGroup;
  formCarnes!: FormGroup;
  formBebidas!: FormGroup;
  formTipoChurrasco!: FormGroup;

  carnesLista: { value: string; label: string; tipo: string }[] = [];

  bebidasLista: { value: string; label: string }[] = [];

  tiposChurrasco = Object.values(TipoChurrasco);
  tiposChurrascoEnum = TipoChurrasco;
  tipoChurrascoSelecionado!: string;

  // valores totais
  adultos_total = 0;
  criancas_total = 0;

  exibirResultados = false;

  getCarnes = this.churrascometroService.getCarnes;
  getBebidas = this.churrascometroService.getBebidas;

  carnesSelecionadas: string[] = [];
  bebidasSelecionadas: string[] = [];

  constructor(
    private churrascometroService: ChurrascometroService,
    private formBuilder: FormBuilder
  ) {
    this.formTipoChurrasco = this.formBuilder.group({
      tipoChurrasco: ['', this.radioRequiredValidator()],
    });

    this.formPessoas = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(0)]),
      criancas: new FormControl(null),
    });

    this.formCarnes = this.formBuilder.group({});
    this.formBebidas = this.formBuilder.group({});

    effect(() => {
      if (this.getBebidas()?.length > 0) {
        this.getBebidas().forEach((bebida) => {
          if (!this.formBebidas.get(bebida.nome)) {
            this.bebidasLista.push({
              value: bebida.nome,
              label: new TitleCasePipe().transform(bebida.nome),
            });
            this.formBebidas.addControl(bebida.nome, new FormControl(null));
          }
        });
      }

      if (this.getCarnes() !== null && this.getCarnes().length > 0) {
        this.getCarnes().forEach((carne) => {
          if (!this.formCarnes.get(carne.nome)) {
            this.carnesLista.push({
              value: carne.nome,
              label: new TitleCasePipe().transform(carne.nome),
              tipo: carne.tipo,
            });
            this.formCarnes.addControl(carne.nome, new FormControl(null));
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.inicializarService();
  }

  inicializarService(): void {
    this.churrascometroService.httpGetCarnes().subscribe();
    this.churrascometroService.httpGetBebidas().subscribe();
  }

  submit(): void {
    if (
      this.formTipoChurrasco.valid &&
      this.formPessoas.valid &&
      this.formCarnes.valid &&
      this.formBebidas.valid
    ) {
      const formPessoasValues = this.formPessoas.value;
      this.carnesSelecionadas = [];
      this.bebidasSelecionadas = [];

      // const adultos = this.formPessoas.get('adultos')?.value;
      // const adultos = this.formPessoas.controls['adultos']?.value;
      const adultos = formPessoasValues.adultos;
      const criancas = formPessoasValues.criancas;

      if (adultos) {
        this.adultos_total = adultos;
      }

      if (criancas) {
        this.criancas_total = criancas;
      }

      Object.entries(this.formCarnes.value).forEach(([carne, valor]) => {
        if (valor) {
          this.carnesSelecionadas.push(carne);
        }
      });

      Object.entries(this.formBebidas.value).forEach(([bebida, valor]) => {
        if (valor) {
          this.bebidasSelecionadas.push(bebida);
        }
      });

      this.exibirResultados = true;
    }
  }

  calculaPreco(
    quantAdulto: number,
    quantCrianca: number,
    consumoAdulto: number,
    consumoCrianca: number,
    precoProduto: number
  ): number {
    const consumo = quantAdulto * consumoAdulto + quantCrianca * consumoCrianca;
    return (consumo / 1000) * precoProduto;
  }

  calcularValorTotal(): number {
    let valorTotal = 0;

    this.getBebidas().forEach((bebida) => {
      if (this.bebidasSelecionadas.includes(bebida.nome)) {
        valorTotal += this.calculaPreco(
          this.adultos_total,
          this.criancas_total,
          bebida.consumo_medio_adulto_ml,
          bebida.consumo_medio_crianca_ml,
          bebida.preco_unidade
        );
      }
    })

    this.getCarnes().forEach((carne) => {
      if (this.carnesSelecionadas.includes(carne.nome)) {
        valorTotal += this.calculaPreco(
          this.adultos_total,
          this.criancas_total,
          carne.consumo_medio_adulto_g,
          carne.consumo_medio_crianca_g,
          carne.preco_kg
        )
      }
    })

    return valorTotal;
  }

  radioRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { required: true };
    };
  }

  carregaTipoChurrasco() {
    this.formBebidas.reset();
    this.formCarnes.reset();
    this.formPessoas.reset();
    this.tipoChurrascoSelecionado = this.formTipoChurrasco.get('tipoChurrasco')?.value;
  }
  gerarPDF(): void {
    const element = document.getElementById('idrelatorio');
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
