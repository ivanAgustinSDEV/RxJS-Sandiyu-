import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base [nombre]="nombre"
      [valor]="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {

  nombre = 'Componente sin darse de baja';
  valor: string;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.service.getValor()
      .pipe(tap(v => console.log(this.nombre, v)))
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.nombre} fue destruido`);
  }

}
