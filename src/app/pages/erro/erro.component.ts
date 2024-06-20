import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-erro',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './erro.component.html',
  styleUrl: './erro.component.scss'
})
export default class ErroComponent implements OnInit {
  status!: string | undefined;
  mensagem!: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status')?.toString();
    // this.status = this.route.snapshot.params['status'];
    this.mensagem = this.route.snapshot.queryParamMap.get('mensagem')?.toString();
    // this.mensagem = this.route.snapshot.queryParams['mensagem'];
    // erro/:status?mensagem={statusText}
  }
}
