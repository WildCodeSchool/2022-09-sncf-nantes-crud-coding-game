const connection = require('../db-config');
const router = require('express').Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM product', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving products from database');
      } else {
        res.json(result);
      }
    });
  });

  router.get('/:id', (req, res) => {
    const animalId = req.params.id;
    connection.query(
        'SELECT * FROM product WHERE id = ?',
        [animalId],
        (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving product from database');
        } else {
            if (results.length) res.json(results[0]);
            else res.status(404).send('Product not found');
        }
        }
    );
    }); 

    router.post('/', (req, res) => {
        const { name, price, description, picture } = req.body;
        connection.query(
          'INSERT INTO product (name, price, description, picture) VALUES (?, ?, ?, ?)',
          [name, price, description, picture],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error saving the product');
            } else {
              const id = result.insertId;
              const createdProduct = { id, name, price, description, picture };
              res.status(201).json(createdProduct);
            }
          }
        );
      });

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;
