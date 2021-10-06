module.exports = {
  "development": {
    "username": "root", // COMPLETAR CON EL USUARIO DE LA BASE DE DATOS
    "password": '',// COMPLETAR CON LA CONTRASEÑA DE LA BASE DE DATOS
    "database": "movies_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root", // COMPLETAR CON EL USUARIO DE LA BASE DE DATOS
    "password": '', // COMPLETAR CON LA CONTRASEÑA DE LA BASE DE DATOS
    "database": "movies_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
