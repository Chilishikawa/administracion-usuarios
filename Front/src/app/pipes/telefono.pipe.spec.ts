import { TelefonoPipe } from './telefono.pipe';

describe('TelefonoPipe', () => {
  let pipe: TelefonoPipe;

  beforeEach(() => {
    pipe = new TelefonoPipe();
  });

  it('should format a phone number correctly', () => {
    const phone = '12345678';
    const formattedPhone = pipe.transform(phone);

    // Verifica que el teléfono esté correctamente formateado
    expect(formattedPhone).toBe('+569 1234 5678');
  });

  it('should return the same value if it is not a valid phone number', () => {
    const phone = 'abcd';
    const formattedPhone = pipe.transform(phone);

    // Verifica que si el número no es válido, retorna el mismo valor
    expect(formattedPhone).toBe('abcd');
  });

  it('should handle empty string', () => {
    const phone = '';
    const formattedPhone = pipe.transform(phone);

    // Verifica que si el valor está vacío, retorna un valor vacío
    expect(formattedPhone).toBe('');
  });

  it('should return formatted number with extra characters', () => {
    const phone = '1234-5678';
    const formattedPhone = pipe.transform(phone);

    // Verifica que los caracteres no numéricos son eliminados
    expect(formattedPhone).toBe('+569 1234 5678');
  });
});
