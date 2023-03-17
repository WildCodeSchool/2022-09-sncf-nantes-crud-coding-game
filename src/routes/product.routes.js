const connection = require('../db-config');
const router = require('express').Router();

router.get('/api/', (req, res) => {
    connection.query('SELECT * FROM product', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving product from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {

});

router.post('/api/products', (req, res) => {
    const { name, price, description, picture } = req.body;
    connection.query(
      'INSERT INTO product (name, price, description, picture ) VALUES (?, ?, ?, ?)',
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

router.delete('api/products/:id', (req, res) => {
    connection.query(
      'DELETE FROM product WHERE id = ?',
      [req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error deleting an product');
        } else {
          if (result.affectedRows) res.status(200).send('🎉 Product deleted!');
          else res.status(404).send('Product not found.');
        }
      }
    );
  });

module.exports = router;
