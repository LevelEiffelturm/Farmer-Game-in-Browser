const express = require("express");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("farmer-game.db");

const port = 3000

let user;

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

function isUserLoggedIn(req) {
  if (req.session.user) {
    return true;
  }
  return false;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

if (!isUserLoggedIn) {
  app.get("/", (req, res) => {
    res.redirect("/index");
  });
} else {
  app.get("/", (req, res) => {
    res.render("game/index", {
      user: user,
    });
  });
}

app.get("/login", (req, res) => {
  res.render("login", {
    // data: data,
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
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

  const givenUser = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!givenUser) {
    return res.status(401).send("Benutzername oder Passwort falsch.");
  }

  const passwordIsCorrect = await bcrypt.compare(password, givenUser.password);

  if (!passwordIsCorrect) {
    return res.status(401).send("Benutzername oder Passwort falsch.");
  }

  user = givenUser;

  res.redirect("/");
});