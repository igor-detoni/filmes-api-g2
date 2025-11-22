const loggerMiddleware = require('../middlewares/loggerMiddleware');

describe('Testes Unitários', () => {
    it('Logger Middleware deve chamar next() e registrar no console', () => {
        const req = { method: 'GET', url: '/unit-test' };
        const res = {};
        const next = jest.fn(); 

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        loggerMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1); 
        expect(logSpy).toHaveBeenCalled(); 

        logSpy.mockRestore();
    });
});