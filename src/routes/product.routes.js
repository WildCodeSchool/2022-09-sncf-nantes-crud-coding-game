const connection = require("../db-config");
const router = require("express").Router();

router.get("/", (req, res) => {
  connection.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res.status(500).send("erreur de connexion a la base de données");
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM product WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur de connexion avec la base de données");
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send("Produit non trouvé");
      }
    }
  );
});

router.post("/", (req, res) => {
  const { name, price, description, picture } = req.body;
  connection.query(
    "INSERT INTO product (name, price, description, picture) VALUES (?, ?, ?, ?)",
    [name, price, description, picture],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("erreur de connextion a la base de données");
      } else {
        const id = result.insertId;
        const createdProduct = { id, name, price, description, picture };
        res.status(201).json(createdProduct);
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const db = connection.promise();
  let existingProduct = null;
  db.query("SELECT * FROM product WHERE id = ?", [req.params.id])
    .then(([results]) => {
      existingProduct = results[0];
      if (!existingProduct) return Promise.reject("RECORD_NOT_FOUND");
      return db.query("UPDATE product SET ? WHERE id = ?", [
        req.body,
        req.params.id,
      ]);
    })
    .then(() => {
      res.status(200).json({ ...existingProduct, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === "RECORD_NOT_FOUND")
        res.status(404).send(`Produit non trouvé`);
      else
        res.status(500).send("erreur a la mise a jour dans la base de données");
    });
});

router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM product WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur a la suppresion dans la base de données");
      } else {
        if (result.affectedRows) res.status(200).send("Produit supprimé");
        else res.status(404).send("Produit non trouvé");
      }
    }
  );
});

module.exports = router;
