import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});

  formStructure = {
    title: 'Crear Nueva Tarea',
    description: 'Completa los datos para crear una tarea.',
    fields: [
      {
        name: 'nombre',
        type: 'text',
        label: 'Nombre de la tarea:',
        validators: [Validators.required],
      },
      {
        name: 'fecha_limite',
        type: 'date',
        label: 'Fecha límite:',
        validators: [Validators.required],
      },
      {
        name: 'personas_asociadas',
        type: 'array',
        label: 'Personas Asociadas: ',
        validators: [], // Puedes manejar la validación en el submit
      },
    ],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  // Crear el formulario principal
  createForm() {
    const group: { [key: string]: any } = {};
    this.formStructure.fields.forEach((field) => {
      const validators = field.validators || [];
      if (field.type === 'array') {
        // Inicializamos el array de personas con un grupo vacío
        group[field.name] = this.fb.array([this.crearPersona()]); // Añadir una persona al inicio
      } else {
        group[field.name] = this.fb.control('', validators);
      }
    });
    this.formGroup = this.fb.group(group);
  }

  // Obtener el FormArray de personas asociadas
  getPersonasAsociadas(): FormArray {
    return this.formGroup.get('personas_asociadas') as FormArray;
  }

  // Crear un FormGroup para una persona
  crearPersona(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(3)]], // Validación de edad
      habilidades: this.fb.array([this.crearHabilidad()]), // Inicializamos el array de habilidades con un grupo vacío
    });
  }

  // Obtener el FormArray de habilidades de una persona
  getHabilidades(index: number): FormArray {
    return (this.getPersonasAsociadas().at(index) as FormGroup).get(
      'habilidades'
    ) as FormArray;
  }

  // Añadir una persona al FormArray
  agregarPersona() {
    this.getPersonasAsociadas().push(this.crearPersona());
  }

  // Eliminar una persona del FormArray
  eliminarPersona(index: number) {
    this.getPersonasAsociadas().removeAt(index);
  }

  // Añadir una habilidad a una persona
  agregarHabilidad(personaIndex: number) {
    this.getHabilidades(personaIndex).push(this.crearHabilidad());
  }

  // Crear un FormGroup para una habilidad
  crearHabilidad(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required], // Validación de habilidad
    });
  }

  // Eliminar una habilidad de una persona
  eliminarHabilidad(personaIndex: number, habilidadIndex: number) {
    this.getHabilidades(personaIndex).removeAt(habilidadIndex);
  }

  // Envío del formulario
  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca todos los campos como tocados
      return;
    }

    console.log(this.formGroup.value); // Aquí podrías manejar el envío de datos
  }
}
