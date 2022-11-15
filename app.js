const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
md5 = require('js-md5');
const uuid = require('uuid');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "books",
});

// Route

app.get("/", (req, res) => {
  res.send("Hello Books!");
});

const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
      const sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else {
      next();
  }
}
app.use(doAuth)




app.get("/admin/hello", (req, res) => {
  res.send("Hello Admin!");
});

app.get("/login-check", (req, res) => {
  const sql = `
  SELECT
  name
  FROM users
  WHERE session = ?
  `;
  con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});


app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});



// // **

app.get("/admin/books-manager", (req, res) => {
  const sql = `
  SELECT
  *
  FROM knygos
`;
con.query(sql, (err, result) => {
if (err) throw err;
res.send(result);

});
});


// // SELECT column_name(s)
// // FROM table1
// // LEFT JOIN table2
// // ON table1.column_name = table2.column_name;

app.get("/book-list/all", (req, res) => {
  const sql = `
        SELECT
       * 
        FROM knygos
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);

  });
});

// SELECT column1, column2, ...
// FROM table_name
// WHERE columnN LIKE pattern;

app.get("/book-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM knygos
        WHERE name LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/book-vote/:id", (req, res) => {
  const sql = `
        UPDATE knygos
        SET count = count + 1, sum = sum + ?
        WHERE id = ?
    `;
  con.query(
    sql,
    [Math.max(Math.min(req.body.vote, 10), 1), req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});





// SELECT column1, column2, ...
// FROM table_name
// ORDER BY column1, column2, ... ASC|DESC;
app.get("/book-list-sorted/", (req, res) => {
  
  let sql;

  if (req.query.by == 'name' && req.query.dir == 'asc'){
    sql = `SELECT * FROM knygos ORDER BY name ASC`;
  }
  else if (req.query.by == 'name' && req.query.dir == 'desc'){
    sql = `SELECT * FROM knygos ORDER BY name DESC`;
  }
  else if (req.query.by == 'vote' && req.query.dir == 'asc'){
    sql = `SELECT * FROM knygos ORDER BY vote ASC`;
  }
  else{
    sql = `SELECT * FROM knygos ORDER BY vote DESC`;
  }
    con.query(
      sql,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
});







app.get("/book-list/:category", (req, res) => {
  if (req.params.category != "all") {
    const sql = `
            SELECT
            *
            FROM knygos
            WHERE category = ?
        `;
    con.query(
      sql,
      [['children','drama', 'sci-fi', 'romance'].indexOf(req.params.category) + 1],
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  }
});

app.post("/books-manager", (req, res) => {
  // INSERT INTO table_name (column1, column2, column3, ...)
  // VALUES (value1, value2, value3, ...);
  const sql = `
        INSERT INTO knygos
        (name, author, category, picture)
        VALUES (?, ?, ?, ?)
    `;

  con.query(
    sql,
    [req.body.name, req.body.author, req.body.category, req.body.picture, req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// app.post("/batu-dydziai", (req, res) => {
//   // INSERT INTO table_name (column1, column2, column3, ...)
//   // VALUES (value1, value2, value3, ...);
//   const sql = `
//         INSERT INTO dydziai
//         (size)
//         VALUES (?)
//     `;

//   con.query(
//     sql,
//     [req.body.size],
//     (err, results) => {
//       if (err) {
//         throw err;
//       }
//       res.send(results);
//     }
//   );
// });

// DELETE FROM table_name
// WHERE some_column = some_value
app.delete("/books-manager/:id", (req, res) => {
  const sql = `
        DELETE FROM knygos
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});


// app.delete("/batu-dydziai/:id", (req, res) => {
//   const sql = `
//         DELETE FROM dydziai
//         WHERE id = ?
//         `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send(result);
//   });
// });

// app.delete("/batu-delete-comment/:id", (req, res) => {
//   const sql = `
//         DELETE FROM komentarai
//         WHERE id = ?
//         `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send(result);
//   });
// });



// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put("/books-manager/:id", (req, res) => {
  let sql;
  let args;
    if('' === req.body.picture && req.body.del == 0) {
      sql = `
        UPDATE knygos
        SET name = ?, author = ?, category = ?
        WHERE id = ?
    `;
      args = [req.body.name, req.body.author, !req.body.category ? 0 : req.body.category, req.params.id];
    } else if(1 == req.body.del) {
        sql = `
        UPDATE knygos
        SET name = ?, author = ?, category = ?, picture = NULL
        WHERE id = ?
    `;
    args = [req.body.name, req.body.author, !req.body.category ? 0 : req.body.category, req.params.id];
    } else {
      sql = `
      UPDATE knygos
      SET name = ?, author = ?, category = ?, picture = ?
      WHERE id = ?
  `;
  args = [req.body.name, req.body.author, !req.body.category ? 0 : req.body.category, req.body.picture, req.params.id];
    }
  con.query(
    sql,
    args,
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});