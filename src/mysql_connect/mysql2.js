const mysql = require("mysql2/promise");

const dbConnect = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}); 
 
async function testDbConnection() {
  try {
    const connection = await dbConnect.getConnection();
    console.log("MySQL2 Connection Successful");
    connection.release();
  } catch (error) { 
    console.error("MySQL2 Connection Failed. " + error);
  }
}

testDbConnection();

module.exports = dbConnect;