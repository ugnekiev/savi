const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
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
    database: "savivalda",

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log(`Savivaldybes yra ${port} porte!`)
});
/////////////////LOGIN/////////////

// const doAuth = function(req, res, next) {
//     if (0 === req.url.indexOf('/admin')) { // admin
//         const sql = `
//         SELECT
//         name, role
//         FROM users
//         WHERE session = ?
//     `;
//         con.query(
//             sql, [req.headers['authorization'] || ''],
//             (err, results) => {
//                 if (err) throw err;
//                 if (!results.length || results[0].role !== 'admin') {
//                     res.status(401).send({});
//                     req.connection.destroy();
//                 } else {
//                     next();
//                 }
//             }
//         );
//     } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
//         next();
//     } else { // fron
//         const sql = `
//         SELECT
//         name, role
//         FROM users
//         WHERE session = ?
//     `;
//         con.query(
//             sql, [req.headers['authorization'] || ''],
//             (err, results) => {
//                 if (err) throw err;
//                 if (!results.length) {
//                     res.status(401).send({});
//                     req.connection.destroy();
//                 } else {
//                     next();
//                 }
//             }
//         );
//     }
// }
// app.use(doAuth)

// // AUTH
// app.get("/login-check", (req, res) => {
//     let sql;
//     let requests;
//     if (req.query.role === 'admin') {
//         sql = `
//         SELECT
//         name
//         FROM users
//         WHERE session = ? AND role = ?
//         `;
//         requests = [req.headers['authorization'] || '', req.query.role];
//     } else {
//         sql = `
//         SELECT
//         name
//         FROM users
//         WHERE session = ?
//         `;
//         requests = [req.headers['authorization'] || ''];
//     }
//     con.query(sql, requests, (err, result) => {
//         if (err) throw err;
//         if (!result.length) {
//             res.send({ msg: 'error' });
//         } else {
//             res.send({ msg: 'ok' });
//         }
//     });
// });


// app.post("/login", (req, res) => {
//     const key = uuid.v4();
//     const sql = `
//     UPDATE users
//     SET session = ?
//     WHERE name = ? AND pass = ?
//   `;
//     con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
//         if (err) throw err;
//         if (!result.affectedRows) {
//             res.send({ msg: 'error', key: '' });
//         } else {
//             res.send({ msg: 'ok', key });
//         }
//     });
// });

/////////////////////END///////////////////

//CREATE
app.post("/server/savivaldybes", (req, res) => {
    const sql = `
    INSERT INTO savivaldybes (name, image)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.title, req.body.image], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/server/paslaugos", (req, res) => {
    const sql = `
    INSERT INTO paslaugos (title)
    VALUES (?)
    `;
    con.query(sql, [req.body.title], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//
app.post("/server/komentarai", (req, res) => {
    const sql = `
    INSERT INTO komentarai (komentaras, savivaldybiu_id, paslaugu_id)
    VALUES (?, ?, ?)
    `;
    con.query(sql, [req.body.comment, req.body.savivaldybiu_id, req.body.paslaugu_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/savivaldybes", (req, res) => {
    const sql = `
    SELECT id, name, image
    FROM savivaldybes
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/paslaugos", (req, res) => {
    const sql = `
    SELECT *
    FROM paslaugos
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/komentarai", (req, res) => {
    const sql = `
    SELECT *
    FROM komentarai
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//HOME LIST
app.get("/home/komentarai", (req, res) => {
    const sql = `
    SELECT k.*, s.name AS savName, s.id AS sid, p.title
    FROM komentarai AS k
    INNER JOIN savivaldybes AS s 
    ON k.savivaldybiu_id = s.id
    INNER JOIN paslaugos AS p 
    ON k.paslaugu_id = p.id
    ORDER BY s.name
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//EDIT
// app.put("/server/savivaldybes/:id", (req, res) => {
//     const sql = `
//     UPDATE savivaldybes
//     SET name = ?, image = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.image, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

app.put("/server/savivaldybes/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE savivaldybes
        SET name = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.name, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE savivaldybes
        SET name = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.name, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE savivaldybes
        SET name = ?
        WHERE id = ?
        `;
        r = [req.body.name, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/server/paslaugos/:id", (req, res) => {
    const sql = `
    UPDATE paslaugos
    SET title = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// //jungiame komentaru su savivaldybiu ir paslaugu lentelemis
app.get("/server/komentarai", (req, res) => {
    const sql = `
    SELECT k.*, name, surname, title, s.id AS sid
    FROM komentarai AS k
    INNER JOIN savivaldybes AS s
    ON k.savivaldybiu_id = s.id
    INNER JOIN paslaugos AS p
    ON k.paslaugu_id = p.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//DELETE
app.delete("/server/komentarai/:id", (req, res) => {
    const sql = `
    DELETE from komentarai
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/server/komentarai/:id", (req, res) => {
    const sql = `
    UPDATE komentarai
    SET state = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.state, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



// app.post("/server/bills", (req, res) => {
//     const sql = `
//     INSERT INTO bills (consumer_id, invoice_nr, kwh, total)
//     VALUES (?, ?, ?, ?)
//     `;
//     con.query(sql, [req.body.consumerId, req.body.invoice, req.body.kwh, req.body.total], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //READ ALL
// app.get("/server/suppliers", (req, res) => {
//     const sql = `
//     SELECT *
//     FROM electricity_suppliers
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });



// //jungiame suplieriu ir consumeriu db lenteles
// app.get("/server/all", (req, res) => {
//     const sql = `
//     SELECT title, c.*, s.id AS sid, price
//     FROM electricity_suppliers AS s
//     INNER JOIN electricity_consumers AS c
//     ON c.supplier_id = s.id
//     `;
// //s.id AS sid - nuskaitome is supplier lenteles id ir pervadiname i sid
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //jungiame bills ir consumeriu lenteles; kiekvienas bills turi consumeri
// app.get("/server/bills", (req, res) => {
//     const sql = `
//     SELECT b.*, name, surname, title, s.id AS sid
//     FROM bills AS b
//     INNER JOIN electricity_consumers AS c
//     ON b.consumer_id = c.id
//     INNER JOIN electricity_suppliers AS s
//     ON c.supplier_id = s.id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// }); 
//     const sql = `
//     SELECT d.*, name, surname, idea.id 
//     FROM donors AS d
//     INNER JOIN ideas AS i
//     ON d.idea_id 



// //DELETE
// app.delete("/server/suppliers/:id", (req, res) => {
//     const sql = `
//     DELETE from electricity_suppliers
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.delete("/server/consumers/:id", (req, res) => {
//     const sql = `
//     DELETE from electricity_consumers
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.delete("/server/bills/:id", (req, res) => {
//     const sql = `
//     DELETE from bills
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });
// //EDIT
// app.put("/server/suppliers/:id", (req, res) => {
//     const sql = `
//     UPDATE electricity_suppliers
//     SET title = ?, price = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.price, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.put("/server/consumers/:id", (req, res) => {
//     const sql = `
//     UPDATE electricity_consumers
//     SET name = ?, surname = ?, counter_number = ?, supplier_id = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.name, req.body.surname, req.body.countnumber, req.body.supplier, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });
