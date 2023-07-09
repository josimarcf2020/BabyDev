const database = require('../database');

module.exports = {
    searchCursos:() => {
        return new Promise((accepted, reject) => {
            database.query('SELECT * FROM cursos', (error, results) => {
                if(error){rejected(error); return}
                accepted(results);
            });
        });
    },

    getCursosById:(codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM cursos WHERE id = ${codigo}`, (error, results) => {
                if(error){rejected(error); return}
                accepted(results);
            });
        });
    },

}