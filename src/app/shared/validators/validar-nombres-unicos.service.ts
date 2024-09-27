import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidarNombresUnicosService {
  // Validador personalizado para asegurar que los nombres sean únicos
  validarNombresUnicos(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    const nombres = formArray.controls.map((group) =>
      group.get('nombre')?.value?.toLowerCase().trim()
    );

    const nombresUnicos = new Set(nombres);
    const tieneDuplicados = nombresUnicos.size !== nombres.length;

    return tieneDuplicados ? { nombreDuplicado: true } : null;
  }
}
