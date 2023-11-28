import { envs } from '../src/config';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server')

describe('app.ts', () => {
   test('should calls the server', async() => {
      
      await import('../src/app')

      expect(Server).toHaveBeenCalled()
      expect(Server).toHaveBeenCalledWith({
	 port: envs.PORT,
	 routes: expect.any(Function)
      }) 
   })
})
