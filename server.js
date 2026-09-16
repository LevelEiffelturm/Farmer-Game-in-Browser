const express = require("express");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("farmer-game.db");

const port = 3000

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/", (request, response) => {
  response.render("index", {
    // data: data,
  });
});

app.get("/login", (request, response) => {
  response.render("login", {
    // data: data,
  });
});

app.get("/register", (request, response) => {
  response.render("register", {
    // data: data,
  });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const statement = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    );

    statement.run(username, passwordHash);
    res.redirect("/login");
  } catch (error) {
    res.status(400).send("Benutzername existiert bereits.");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user) {
    return res.status(401).send("Benutzername oder Passwort falsch.");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    return res.status(401).send("Benutzername oder Passwort falsch.");
  }

  res.redirect("/");
});