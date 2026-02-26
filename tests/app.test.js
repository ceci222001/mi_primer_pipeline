const request = require('supertest');
const app = require('../src/app');
const { calculateValue } = require('../src/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

  describe('Pruebas Unitarias - Lógica de Inventario', () => {

    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5);
      expect(result).toBe(50);
    });

    // Valida que si se ingresan valores negativos,
    // Esto evita datos inválidos en el sistema.
    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5);
      expect(result).toBe(0);
    });

    // Comprueba que si el stock es 0,
    // el valor total del inventario también sea 0.
    
    test('Debe retornar 0 si el stock es 0', () => {
      const result = calculateValue(10, 0);
      expect(result).toBe(0);
    });

    // Verifica que si el precio es 0,
    // el resultado sea 0.
    // Esto evita cálculos incorrectos.
    test('Debe retornar 0 si el precio es 0', () => {
      const result = calculateValue(0, 10);
      expect(result).toBe(0);
    });

  });
  describe('Pruebas de Integración - API Endpoints', () => {

  
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('stock');
    });


    
    test('GET /items - Debe contener al menos un elemento', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });


    
    // Verifica que si se accede a una ruta
    // que no existe, el servidor responda
    test('GET /ruta-inexistente - Debe responder con 404', async () => {
      const response = await request(app).get('/ruta-inexistente');
      expect(response.statusCode).toBe(404);
    });

  });

});
