import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, exhaustMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nombre: [curso.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }



  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = '¡Curso creado con éxito!';
      let msgError = 'Error al crear el curso, ¡inténtalo de nuevo!';
      if (this.form.value.id) {
        msgSuccess = '¡Curso actualizado con éxito!';
        msgError = 'Error al actualizar el curso, inténtalo de nuevo.';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
            this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );


    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
