const mysql = require('mysql2/promise');
const credentials = {
    host: 'as2091.brighton.domains',
    user: 'as2091_zap',
    password: 'FuckThePauls',
    database: 'as2091_zap'
};
async function query(sql, params) {
 const connection = await mysql.createConnection(credentials);
 const [results, ] = await connection.execute(sql, params);
 return results;
}
module.exports = {
 query
}





