
// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Expiracion de token
// ============================
process.env.TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '48h';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://matias:contra10@cluster0-jssy7.mongodb.net/users?retryWrites=true';
    process.env.DEBUG = true;
} else {
    urlDB = process.env.MONGO_URI;
    process.env.DEBUG = false;

}
process.env.URLDB = urlDB;

// ============================
//  Services 
// ============================

module.exports = { 

    // Account service
    ACCOUNT_SVC_SERVICE_HOST: process.env.ACCOUNT_SVC_SERVICE_HOST,
    ACCOUNT_SVC_SERVICE_PORT: process.env.ACCOUNT_SVC_SERVICE_PORT,

}

