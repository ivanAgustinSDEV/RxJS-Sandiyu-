import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nombre]="nombre"
      [valor]="valor$ | async" estilo="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  nombre = 'Componente con async';
  valor$: Observable<string>;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.valor$ = this.service.getValor()
      .pipe(tap(v => console.log(this.nombre, v)));
  }

  ngOnDestroy() {
    console.log(`${this.nombre} fue destruido`);
  }

}
