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

router.delete("/:id", (req, res) => {});

module.exports = router;
