const connection = require("../db-config");
const router = require("express").Router();

router.get("/", (req, res) => {
  connection.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res
        .status(500)
        .send("Erreur pas de produit retrouvé dans la base de données");
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM product WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).send("Produit non trouvé dans la base de données");
      } else {
        if (result.affectedRows) res.status(200).send("Produit supprimé");
        else res.status(404).send("Produit non trouvé");
      }
    }
  );
});

module.exports = router;
