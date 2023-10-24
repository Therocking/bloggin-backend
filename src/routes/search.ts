import { Router } from 'express';

import { validFields, validJwt, } from '../middlewares/';
import SearchController from '../controllers/search';


const searchController = new SearchController();
const router = Router();

router.get('/:collection/:termino',[
    validJwt,
    validFields, // Valid if have any error
],searchController.search);

// The middleware **valid-fields** is reapeted so that there is only one error

export default router;