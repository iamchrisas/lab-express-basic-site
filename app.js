const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3000;

//Setup hbs view engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Setup public folder for static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

let todos = [];

//Display all todos
app.get("/", (req, res) => {
  res.render("index", { todos });
});

//Add new todo
app.post("/add-todo", (req, res) => {
  const { todo } = req.body;
  if (todo) {
    todos.push({ description: todo, isComplete: false });
  }
  res.redirect("/");
});

//Remove todo
app.post("/remove-todo/:index", (req, res) => {
  const { index } = req.params;
  todos.splice(index, 1);
  res.redirect("/");
});

//Listen port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
