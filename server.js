const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/", (request, response) => {
  response.render("index", {
    // data: data,
  });
});
