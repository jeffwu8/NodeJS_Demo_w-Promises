var db = require("./db");

exports.getAllAuthors = () =>
  new Promise((resolve, reject) => {
    db.query("select * from author", function(err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });

  exports.addAuthor = author =>
  new Promise((resolve, reject) =>
    db.beginTransaction(function(err) {
      if (err) reject(err);

      db.query(
        "insert into author(author_name) values(?)",
        [author.author_name],
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

  exports.updateAuthor = (author_id, author) =>
  new Promise((resolve, reject) =>
    db.beginTransaction(function(err) {
      if (err) reject(err);

      db.query(
        "update author set author.author_name = ? where author.author_id = ?",
        [author.author_name, author_id],
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

exports.removeAuthor = author_id =>
  new Promise((resolve, reject) => {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query("delete from author where author.author_id = ?", [author_id], function(
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