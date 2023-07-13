const { Router } = require('express');
const AlunoService = require('../services/AlunoService');

module.exports = {
    readAlunos: async (req, res) => {
        let json = {error: '', result:[]};
        let alunos = await AlunoService.searchAlunos();

        for (let i in alunos) {
            json.result.push({
                idAluno:alunos[i].id,
                nome: alunos[i].nome,
                sobrenome: alunos[i].sobrenome,
                telefone: alunos[i].telefone,
                email: alunos[i].email,
                idCurso: alunos[i].idCurso
            });
        }

        res.header("Access-Control-Allow-Origin", "*")
        res.json(json);
        
    }, 

    readAluno: async (req, res) => {
        let json = {error: '', result:[]};
        let codigo = req.params.codigo;

        let alunos = await AlunoService.searchAluno(codigo);

        for (let i in alunos) {
            json.result.push({
                idAluno:alunos[i].id,
                nome: alunos[i].nome,
                sobrenome: alunos[i].sobrenome,
                telefone: alunos[i].telefone,
                email: alunos[i].email,
                idCurso: alunos[i].idCurso
            });
        }

        res.header("Access-Control-Allow-Origin", "*")
        res.json(json);
        
    },

    readAlunosByCurso: async(req, res) => {

        let json = {error: ``, result: []};
        let codigo = req.params.codigo;

        let alunos = await AlunoService.getAlunosByCurso(codigo);

        for (let i in alunos) {
            json.result.push({
                idAluno:alunos[i].id,
                nome: alunos[i].nome,
                sobrenome: alunos[i].sobrenome,
                telefone: alunos[i].telefone,
                email: alunos[i].email,
                idCurso: alunos[i].idCurso
            });
        }

        res.header("Access-Control-Allow-Origin", "*")
        res.json(json);

    },

    createAluno: async(req, res) => {
        let json = {error: "", result: {} };

        let nome        = req.body.nome;
        let sobrenome   = req.body.sobrenome;
        let email       = req.body.email;
        let idCurso     = req.body.idCurso;
        let telefone    = req.body.telefone;

        let vagas = await AlunoService.returnVagas(idCurso);

        json.result = {
            vagas
        };

        let quant = json.result.vagas[0].quantidade;

        if (quant == 0){
            json.error = 'Vaga indisponível';
        } else {

            if(nome && sobrenome && telefone && email && idCurso){
                let aluno = await AlunoService.createAluno(
                    nome,
                    sobrenome,
                    telefone,
                    email,
                    idCurso
                );
    
                json.result = {
                    codigo: aluno,
                    nome,
                    sobrenome,
                    telefone,
                    email,
                    idCurso
                }
            }
            else {
                json.error = 'Incomplete fields'
            }

            await AlunoService.decrementaVaga(idCurso);

        }

        res.header("Access-Control-Allow-Origin", "*")
        res.json(json);
        
    },

    updateAluno: async(req, res) => {
        let json = {error: '', result: {}};

        let codigo = req.params.codigo;
        let nome = req.body.nome;
        let sobrenome = req.body.sobrenome;
        let telefone = req.body.telefone;
        let email = req.body.email;
        let idcurso = req.body.idcurso;

        if (codigo && nome && sobrenome && telefone && email && idcurso) {
            await AlunoService.updateAluno(codigo, nome, sobrenome, telefone, email, idcurso);

            json.result = {codigo, nome, sobrenome, telefone, email, idcurso};

        }else{
            json.error = 'Incomplete Fields'
        }

        res.header("Access-Control-Allow-Origin", "*")
        res.json(json);

    },

    deleteAluno: async(req, res) => {
        let json = {error: '', result: {}};

        codigo = req.params.codigo;
        let curso = await AlunoService.getCursoByIdAluno(codigo);

        if(curso.length == 0) {
            json.error = 'Aluno inexistente!';
        } else {

            json.result = {
                curso
            };

            let idcurso = json.result.curso[0].idcurso;

            await AlunoService.deleteAluno(codigo);
            await AlunoService.incrementaVaga(idcurso);

        }
        
        res.header("Access-Control-Allow-Origin", "*")
        res.json(json);

    }
    
};