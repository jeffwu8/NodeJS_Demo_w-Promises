var routes = require("express").Router();
var db = require("../dao/db");
var bookDao = require("../dao/bookDao");

routes.get("/book", function(req, res) {
  bookDao.getAllBooks().then(result => {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(err => console.log(err));
});

routes.post("/book", function(req, res) {
  var book = req.body;
  bookDao.addBook(book).then(result => {
    res.status(201);
    res.send(result);
  })
  .catch(err => {
    res.status(400);
    res.send(book);
  });
});

routes.put("/book/:id", function(req, res) {
  var book = req.body;
  bookDao.updateBook(req.params.id, book).then(result => {
    res.status(201);
    res.send("Update Book Successful!");
  })
  .catch(err => {
    res.status(400);
    res.send("Update Book Failed!");
  });
});

routes.delete("/book/:id", function(req, res) {
  bookDao.removeBook(req.params.id).then(result => {
    res.send("Delete Book Successful!");
  })
  .catch(err => {
    res.status(400);
    res.send("Delete Book Failed!");
  });
});

module.exports = routes;
