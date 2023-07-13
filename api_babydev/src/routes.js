const express = require('express');
const app = express();
const Router = express.Router();
const AlunoController = require('./controllers/AlunoController');
const CursoController = require('./controllers/CursoController');
const { urlencoded } = require('body-parser');
const cors = require('cors');

app.use(express.json());

Router.options('*', cors());

Router.post('/alunos', AlunoController.createAluno);
Router.get('/aluno/:codigo', AlunoController.readAluno);
Router.get('/alunos', AlunoController.readAlunos);
Router.get('/alunos/:codigo', AlunoController.readAlunosByCurso);
Router.put('/aluno/:codigo', AlunoController.updateAluno);
Router.delete('/alunos/:codigo', AlunoController.deleteAluno);

Router.get('/cursos', CursoController.readCursos);
Router.get('/cursos/:codigo', CursoController.readCursosById);

module.exports = Router;