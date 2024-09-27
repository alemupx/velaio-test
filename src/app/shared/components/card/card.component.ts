import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Define una interfaz para los campos del formulario
interface FormField {
  name: string;
  type: string;
  label: string;
  validators: { required?: boolean; minlength?: number; min?: number };
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  formGroup: FormGroup;

  // Estructura del formulario
  formStructure = {
    title: 'Crear Nueva Tarea',
    description: 'Completa los datos para crear una tarea.',
    fields: [
      {
        name: 'nombre',
        type: 'text',
        label: 'Nombre de la tarea:',
        validators: { required: true, minlength: 5 },
      },
      {
        name: 'fecha_limite',
        type: 'date',
        label: 'Fecha límite:',
        validators: { required: true },
      },
      {
        name: 'personas_asociadas',
        type: 'array',
        label: 'Personas Asociadas',
        validators: {},
      },
    ] as FormField[], // Especificar que `fields` es un arreglo de `FormField`
  };

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const group: { [key: string]: any } = {}; // Usar un objeto que pueda ser indexado
    this.formStructure.fields.forEach((field) => {
      const validators = this.mapValidators(field.validators || {});
      if (field.type === 'array') {
        group[field.name] = this.fb.array([this.crearPersona()]);
      } else {
        group[field.name] = this.fb.control('', validators);
      }
    });
    this.formGroup = this.fb.group(group); // Crear el grupo con los campos procesados
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
    return this.formGroup.get('personas_asociadas') as FormArray;
  }

  crearPersona(): FormGroup {
    return this.fb.group({
      nombre: ['', this.mapValidators({ required: true, minlength: 5 })],
      edad: ['', this.mapValidators({ required: true, min: 18 })],
      habilidades: this.fb.array([this.crearHabilidad()]),
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
      'habilidades'
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

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    console.log(this.formGroup.value);
  }
}
