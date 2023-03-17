const connection = require('../db-config');
const router = require('express').Router();

router.get('/', (req, res) => {
connection.query('SELECT * FROM product', (err, result) => {
    if(err){
        res.status(500).send('Error retrieving product');
    } else {
        res.json(result);
    }
    });
});

router.get('/:id', (req, res) => {
const productId = req.params.id;
connection.query(
    'SELECT * FROM product WHERE id = ?',
    [productId],
    (err, results) => {
        if(err){
            res.status(500).send('Error retrieving animal from database')
        } else {
            if(results.length) res.json(result[0]);
            else res.status(404).send('Product not found')
        }
    }
)
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;
