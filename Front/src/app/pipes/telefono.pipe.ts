import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono'
})
export class TelefonoPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Eliminar cualquier carácter que no sea número
    const cleaned = value.replace(/\D/g, '');

    // Asegurarse de que el número tenga al menos 8 dígitos
    if (cleaned.length < 8) {
      return value;
    }

    // Formatear el teléfono
    const prefijo = '+569 ';
    const parte1 = cleaned.substring(0, 4);
    const parte2 = cleaned.substring(4, 8);

    return `${prefijo}${parte1} ${parte2}`;
  }

}
