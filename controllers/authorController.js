var routes = require("express").Router();
var db = require("../dao/db");
var authorDao = require("../dao/authorDao");

routes.get("/author", function(req, res) {
  authorDao.getAllAuthors().then(result => {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(err => console.log(err));
});

routes.post("/author", function(req, res) {
  var author = req.body;
  authorDao.addAuthor(author).then(result => {
    res.status(201);
    res.send("Add Author Successful!");
  })
  .catch(err => {
    res.status(400);
    res.send(author);
  });
});

routes.put("/author/:id", function(req, res) {
  var author = req.body;
  authorDao.updateAuthor(req.params.id, author).then(result => {
    res.status(201);
    res.send("Update Author Successful!");
  })
  .catch(err => {
    res.status(400);
    res.send("Update Author Failed!");
  });
});

routes.delete("/author/:id", function(req, res) {
  authorDao.removeAuthor(req.params.id).then(result => {
    res.send("Delete Author Successful!");
  })
  .catch(err => {
    res.status(400);
    res.send("Delete Author Failed!");
  });
});

module.exports = routes;
