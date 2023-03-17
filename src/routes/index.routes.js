const router = require('express').Router();
const animalsRouter = require('./animal.routes');
const productsRouter = require('./product.routes');

router.use('/products', productsRouter);
router.use ('/animals', animalsRouter);



module.exports = router;
