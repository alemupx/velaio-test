import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidarNombresUnicosService } from '../../validators/validar-nombres-unicos.service';
import { FormField } from '../../interfaces/form-field';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/store/actions/task.actions';

@Component({
  selector: 'app-card',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
})
export class CardComponent implements OnInit {
  formGroup: FormGroup;
  @Output() onClose = new EventEmitter<void>();
  isLoading: boolean = false;

  // Estructura del formulario
  formStructure = {
    title: 'Crear Nueva Tarea',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Nombre de la tarea:',
        validators: { required: true, minlength: 5 },
      },
      {
        name: 'dueDate',
        type: 'date',
        label: 'Fecha límite:',
        validators: { required: true },
      },
      {
        name: 'associatedPeople',
        type: 'array',
        label: 'Personas Asociadas',
        validators: {},
      },
    ] as FormField[],
  };

  constructor(
    private fb: FormBuilder,
    private validarNombresUnicosValidator: ValidarNombresUnicosService,
    private store: Store
  ) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const group: { [key: string]: any } = {};
    this.formStructure.fields.forEach((field) => {
      const validators = this.mapValidators(field.validators || {});
      if (field.type === 'array') {
        group[field.name] = this.fb.array(
          [this.crearPersona()],
          this.validarNombresUnicosValidator.validarNombresUnicos
        );
      } else {
        group[field.name] = this.fb.control('', validators);
      }
    });
    this.formGroup = this.fb.group(group);
  }

  mapValidators(validators: {
    required?: boolean;
    minlength?: number;
    min?: number;
  }) {
    const mappedValidators = [];
    if (validators.required) mappedValidators.push(Validators.required);
    if (validators.minlength)
      mappedValidators.push(Validators.minLength(validators.minlength));
    if (validators.min) mappedValidators.push(Validators.min(validators.min));
    return mappedValidators;
  }

  getPersonasAsociadas(): FormArray {
    return this.formGroup.get('associatedPeople') as FormArray;
  }

  crearPersona(): FormGroup {
    return this.fb.group({
      name: ['', this.mapValidators({ required: true, minlength: 5 })],
      age: ['', this.mapValidators({ required: true, min: 18 })],
      skills: this.fb.array([this.crearHabilidad()]),
    });
  }

  agregarPersona() {
    this.getPersonasAsociadas().push(this.crearPersona());
  }

  eliminarPersona(index: number) {
    this.getPersonasAsociadas().removeAt(index);
  }

  getHabilidades(index: number): FormArray {
    return (this.getPersonasAsociadas().at(index) as FormGroup).get(
      'skills'
    ) as FormArray;
  }

  agregarHabilidad(personaIndex: number) {
    this.getHabilidades(personaIndex).push(this.crearHabilidad());
  }

  crearHabilidad(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  eliminarHabilidad(personaIndex: number, habilidadIndex: number) {
    this.getHabilidades(personaIndex).removeAt(habilidadIndex);
  }

  transformTaskData(formValue: any) {
    return {
      title: formValue.title,
      dueDate: formValue.dueDate,
      associatedPeople: formValue.associatedPeople.map((persona: any) => ({
        name: persona.name,
        age: persona.age,
        // Transforma las habilidades en cadenas de texto si son objetos
        skills: persona.skills.map((habilidad: any) =>
          typeof habilidad === 'object' ? habilidad.nombre : habilidad
        ),
      })),
      completed: false,
    };
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.store.dispatch(
      addTask({ task: this.transformTaskData(this.formGroup.value) })
    );

    setTimeout(() => {
      this.isLoading = false;
      this.onClose.emit();
    }, 3000);
  }
}
