import {Iuser} from './src/types/types';

declare global {
    namespace Express {
        interface Request {
            user: Iuser; // Extendiendo la interfaz Request para incluir la propiedad 'user' de tipo 'Iuser'
        }
    }
}
