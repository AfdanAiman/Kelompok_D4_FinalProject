const mysql = require("mysql2");

let db;

function connectDB() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.log("❌ DB not ready, retrying in 5s...");
      setTimeout(connectDB, 5000);
    } else {
      console.log("✅ MySQL connected");
    }
  });
}

connectDB();
module.exports = () => db;
