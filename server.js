const express = require("express");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const session = require("express-session");

const app = express();
const db = new Database("farmer-game.db");

const port = 3000

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" },
  }),
);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS player_progress (
    user_id INTEGER PRIMARY KEY,
    level INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("game/index", { user: req.session.user });
});

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

app.get("/api/progress", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Nicht eingeloggt." });
  }

  const progress = db
    .prepare("SELECT level FROM player_progress WHERE user_id = ?")
    .get(req.session.user.id);

  res.json({ level: progress?.level ?? 0 });
});

app.post("/api/progress/level", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Nicht eingeloggt." });
  }

  const level = Number(req.body.level);

  if (!Number.isInteger(level) || level < 0) {
    return res.status(400).json({ error: "Ungueltiger Level." });
  }

  db.prepare(`
    INSERT INTO player_progress (user_id, level)
    VALUES (?, ?)
    ON CONFLICT(user_id) DO UPDATE SET level = excluded.level
  `).run(req.session.user.id, level);

  res.json({ level });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const statement = db.prepare(
      "INSERT INTO users (username, password, created_at, level, experience, coins) VALUES (?, ?, ?, ?, ?, ?)"
    );

    statement.run(username, passwordHash, new Date().toISOString(), 1, 0, 0);
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

  req.session.user = {
    id: givenUser.id,
    username: givenUser.username,
  };

  res.redirect("/");
});