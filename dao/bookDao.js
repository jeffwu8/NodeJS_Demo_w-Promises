var db = require("./db");

exports.getAllBooks = () =>
  new Promise((resolve, reject) => {
    db.query("select * from book", function(err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });

exports.addBook = book =>
  new Promise((resolve, reject) =>
    db.beginTransaction(function(err) {
      if (err) reject(err);

      db.query(
        "insert into book(title, author_name) values(?,?)",
        [book.title, book.author_name],
        function(err, result) {
          if (err) {
            db.rollback(function(err) {
              reject(err);
            });
          }
          db.commit(function(result) {
            resolve(result);
          });
        }
      );
    })
  );

exports.updateBook = (book_id, book) =>
  new Promise((resolve, reject) =>
    db.beginTransaction(function(err) {
      if (err) reject(err);

      db.query(
        "update book set book.title = ?, book.author_name = ? where book.book_id = ?",
        [book.title, book.author_name, book_id],
        function(err, result) {
          if (err) {
            db.rollback(function(err) {
              reject(err);
            });
          } else {
            db.commit(function(result) {
              resolve(result);
            });
          }
        }
      );
    })
  );

exports.removeBook = book_id =>
  new Promise((resolve, reject) => {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query("delete from book where book.book_id = ?", [book_id], function(
        err,
        res
      ) {
        if (err) {
          db.rollback(function(err, res) {
            reject(err);
          });
        }
        db.commit(function(err, res) {
          resolve(res);
        });
      });
    });
  });
