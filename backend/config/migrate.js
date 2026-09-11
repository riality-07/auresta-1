require("dotenv").config({ path: __dirname + "/../.env" });

const fs = require("fs");
const path = require("path");
const { pool } = require("./db");

async function migrate() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  console.log("Running AURESTA database migration...");

  try {
    await pool.query(sql);
    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();
