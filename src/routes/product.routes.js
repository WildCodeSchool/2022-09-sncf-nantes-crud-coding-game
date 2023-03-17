const connection = require("../db-config");
const router = require("express").Router();

router.get("/", (req, res) => {
  connection.query("SELECT * FROM animal", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving animals from database");
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const animalId = req.params.id;
  connection.query(
    "SELECT * FROM animal WHERE id = ?",
    [animalId],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving animal from database");
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send("Animal not found");
      }
    }
  );
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
