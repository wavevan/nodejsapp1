const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ssm',
    port: 3306
};

const pool = mysql.createPool(dbConfig);

const query = (sql, options, callback) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(`[get connection err] - ${err.message}`);
            callback(err, null, null);
        } else {
            conn.query(sql, options, (err, results, fields) => {
                if(err){
                    console.log(`[excute sql err] - ${err.message}`);
                }
                conn.release();
                callback(err, results, fields);
            });
        }
    });
};
module.exports = query