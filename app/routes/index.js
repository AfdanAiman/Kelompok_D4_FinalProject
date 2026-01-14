const express = require("express");
const router = express.Router();
const getDB = require("../config/database");

router.get("/", (req, res) => {
  const db = getDB();

  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const dataQuery = `
    SELECT * FROM menfess
    WHERE content LIKE ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM menfess
    WHERE content LIKE ?
  `;

  db.query(dataQuery, [`%${search}%`, limit, offset], (err, results) => {
    if (err) {
      console.error(err);
      return res.send("DB Error");
    }

    db.query(countQuery, [`%${search}%`], (err2, countResult) => {
      if (err2) {
        console.error(err2);
        return res.send("DB Error");
      }

      const totalData = Number(countResult[0].total);
      const totalPage = Math.ceil(totalData / limit);

      res.render("index", {
        menfess: results,
        search,
        page,
        totalPage
      });
    });
  });
});

/* ADD */
router.post("/add", (req, res) => {
  const db = getDB();
  const { nama, nim, prodi, content } = req.body;

  db.query(
    "INSERT INTO menfess (nama, nim, prodi, content) VALUES (?, ?, ?, ?)",
    [nama, nim, prodi, content],
    () => res.redirect("/")
  );
});

/* DELETE */
router.post("/delete/:id", (req, res) => {
  const db = getDB();
  db.query("DELETE FROM menfess WHERE id = ?", [req.params.id], () =>
    res.redirect("/")
  );
});

module.exports = router;
