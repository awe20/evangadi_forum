const mysql = require("mysql2");
// const mysql = require("mysql");
require("dotenv").config(); //dotenv config

//db connection
const dbConnection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
});

// checking a connection is created?

// pool.getConnection(function(err, conn) {
//     console.log("database is connected!")
//    });

//createin table on db
const users = `CREATE TABLE if not exists users(
      user_id int auto_increment,
      username varchar(255) not null,
      firstname varchar(255) not null,
      lastname varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null,
      PRIMARY KEY(user_id)
  )`;
const question = `CREATE TABLE IF NOT EXISTS question(
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    question VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);`;
const answer = `CREATE TABLE IF NOT EXISTS answer(
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    question_id INT,
    answer VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(question_id) REFERENCES question(question_id) 
);`;

dbConnection.query(users, (err, results, fields) => {
  if (err) console.log(err);
});
dbConnection.query(question, (err, results, fields) => {
  if (err) console.log(err);
});
dbConnection.query(answer, (err, results, fields) => {
  if (err) console.log(err);
});

module.exports = dbConnection.promise();