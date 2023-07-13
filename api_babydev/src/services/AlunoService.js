const database = require('../database');

module.exports = {
    searchAlunos:() => {
        return new Promise((accepted, rejected) => {
            database.query('SELECT * FROM alunos', (error, results) => {
                if(error){rejected(error); return}
                accepted(results);
            });
        });
    },

    searchAluno:(codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM alunos WHERE id = ${codigo}`, (error, results) => {
                if(error){rejected(error); return}
                accepted(results);
            });
        });
    },

    getAlunosByCurso: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM alunos WHERE idcurso = ${codigo}`, (error, results) => {
                if(error){rejected(error); return}
                accepted(results);
            });
        });
    },

    getCursoByIdAluno: (codigo) => { 
        return new Promise((accepted, rejected) => {
            database.query(`SELECT idcurso FROM alunos WHERE id = ${codigo}`, (error, results) => {
                (error, results) => {
                    if(error)
                        {rejected(error); 
                        return}
                }
                accepted(results);
            });
        });
    },

    createAluno: (nome, sobrenome, telefone, email, idCurso) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `INSERT INTO alunos (
                    nome, 
                    sobrenome, 
                    telefone, 
                    email, 
                    idcurso
                ) 
                VALUES (
                    '${nome}', 
                    '${sobrenome}', 
                    '${telefone}', 
                    '${email}', 
                    ${idCurso}
                )`, 
                (error, results) => {
                if(error){ 
                    rejected(error); 
                    return;
                };
                accepted(results);
            });
        }); 
    },

    updateAluno:  (codigo, nome, sobrenome, telefone, email, idCurso) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `UPDATE alunos 
                SET nome        = '${nome}', 
                    sobrenome   = '${sobrenome}', 
                    telefone    = '${telefone}', 
                    email       = '${email}', 
                    idcurso     = ${idCurso} 
                WHERE id = ${codigo}`, (error, results) => {
                    if(error){
                        rejected(error); 
                        return;
                    }
                    accepted(results);
                }
            );
        });
    },

    deleteAluno:(codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `DELETE FROM alunos WHERE id = ${codigo}`, (error, results) => {
                    if(error){rejected(error); return;}
                    accepted(results);
                }
            );
        });
    },

    decrementaVaga:(idCurso) => {
        return new Promise((accepted, rejected) => {
            database.query(`UPDATE cursos SET quantidade=quantidade-1 WHERE id=${idCurso}`, (error, results) => {
                    if(error){ 
                        rejected(error); 
                        return;
                    };
                    accepted(results);
                }
            );
        });
    },

    incrementaVaga:(idCurso) => {
        return new Promise((accepted, rejected) => {
            database.query(`UPDATE cursos SET quantidade=quantidade+1 WHERE id=${idCurso}`, (error, results) => {
                    if(error){ 
                        rejected(error); 
                        return;
                    };
                    accepted(results);
                }
            );
        });
    },

    returnVagas:(idCurso) => { 
        return new Promise((accepted, rejected) => {
            database.query(`SELECT id, quantidade FROM cursos WHERE id = ${idCurso}`,
            (error, results) => {
                if(error){
                    rejected(error);
                    return;
                }
                accepted(results);
            }); 
        });
    }
}