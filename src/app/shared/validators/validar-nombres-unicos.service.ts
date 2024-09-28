import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidarNombresUnicosService {
  validarNombresUnicos(control: AbstractControl): ValidationErrors | null {
    const personas = control.value;
    const nombres = personas.map((persona: any) => persona.name);

    const nombresUnicos = new Set(nombres);

    if (nombres.length !== nombresUnicos.size) {
      return { nombreDuplicado: true }; // Retorna un error si hay nombres duplicados
    }

    return null; // Si no hay duplicados, no retorna error
  }
}
