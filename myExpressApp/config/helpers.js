const MySqli = require('mysqli');

let conn = new MySqli({
    host: 'localhost',
    post: 3306,
    user: 'fresh_user',
    passwd: '123456',
    db: 'fresh_store'
});


let db = conn.emit(false, '');

module.exports = {
    database: db
};
