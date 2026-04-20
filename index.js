const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());


let todos = [
  {
    id : 5,
    title : "groceries",
    description : "milk , eggs"
  },
  {
    id : 3,
    title : "homework",
    description : "maths  , science"
  }
];

app.get("/todos", function(req,res){
  res.status(200).json(todos);
});

app.get("/todos/:id", function(req,res){
  const todoId = parseInt(req.params.id);
  if (isNaN(todoId)) {
    return res.status(400).send("Invalid ID");
  }
  for(let i = 0; i < todos.length; i++){
    if(todos[i].id == todoId){
      return res.status(200).json(todos[i]);
    }
  }
  res.status(404).send("Todo not found.");
});

app.post("/todos", function(req, res) {

  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  // Check if body is empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Body is empty");
  }

  const title = req.body.title;
  const description = req.body.description;

  // destructured code : const{title, description} = req.body;  same as above 2 lines

  // Validate required fields
  if (!title || !description) {
    return res.status(400).send("Title and description are required");
  }

  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: title,
    description: description
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.put("/todos/:id" , function(req, res){
  const todoId = parseInt(req.params.id);
  if (isNaN(todoId)) {
    return res.status(400).send("Invalid ID");
  }
  for(let i = 0; i < todos.length; i++){
    if(todos[i].id == todoId){
      todos[i].description = req.body.description;
      todos[i].title = req.body.title;
      return res.status(200).json(todos[i]);
    }
  }
  
  res.status(404).send("Todo not found with id " + todoId);
})

app.delete("/todos/:id", function(req,res){
  const todoId = parseInt(req.params.id);
  if (isNaN(todoId)) {
    return res.status(400).send("Invalid ID");
  }

  for(let i = 0; i < todos.length; i++){
    if(todos[i].id == todoId){
      todos.splice(i,1);
      return res.status(200).send("todo deleted")
    }
  }
  
  res.status(404).send("Todo not found with id " + todoId);

});

app.use(function(req,res){
  res.status(404).send("route not found");
});

app.listen(port, function(){
  console.log("server is running on port " + port )
});