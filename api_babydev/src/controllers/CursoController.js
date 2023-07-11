const { Router } = require('express');
const CursoService = require('../services/CursoSevice');

module.exports = {
    readCursos: async (req, res) => {
        let json = {error: '', result:[]};
        let Cursos = await CursoService.searchCursos();

        for (let i in Cursos) {
            json.result.push({
                idCurso:Cursos[i].id,
                curso: Cursos[i].curso,
                quantidade: Cursos[i].quantidade
            });
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.json(json);
        
    },

    readCursosById: async(req, res) => {

        let json = {error: ``, result: []};
        let codigo = req.params.codigo;
        let Cursos = await CursoService.getCursosById(codigo);

        for (let i in Cursos) {
            json.result.push({
                idCurso:Cursos[i].id,
                curso: Cursos[i].curso,
                quantidade: Cursos[i].quantidade
            });
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.json(json);

    },

    readCurso: async(req, res) => {

        let json = {error: ``, result: []};
        let codigo = req.params.codigo;
        let Cursos = await CursoService.getCurso(codigo);

        for (let i in Cursos) {
            json.result.push({
                idCurso:Cursos[i].id,
                curso: Cursos[i].curso,
                quantidade: Cursos[i].quantidade
            });
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.json(json);

    }
    
};