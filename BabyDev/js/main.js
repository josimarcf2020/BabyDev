const url = "http://localhost:3000/api";

function getAlunos() {
    axios.get(`${url}/alunos`)
        .then(
            response => {

                const dados = response.data.result;
                
                let html = ''
            
                for(let i = 0; i < dados.length; i++){
                    html += `<tr>
                                <th scope="row">${dados[i].idAluno}</th>
                                <td>${dados[i].nome}</td>
                                <td>${dados[i].sobrenome}</td>
                                <td>${dados[i].telefone}</td>
                                <td>${dados[i].email}</td>
                                <td><button class="btn btn-success" onclick="updateAluno(${dados[i].idAluno})">Editar</button></td>
                                <td><button class="btn btn-danger" onclick="deleteAluno(${dados[i].idAluno})">Deletar</button></td>
                            </tr>`;
                }

                document.getElementById('table-body').innerHTML = html;

            }

        )
        .catch(
            error => console.log(error)
        )
    
}
    
function deleteAluno(codigo) {
    axios.delete(`${url}/alunos/${codigo}`)
    .then(
        alert("Deletado com sucesso!!!"),
        getAlunos()
    )
    .catch(error => console.log(error))
}

function updateAluno(aluno) {
    axios.update(`${url}/aluno/${aluno}`)
    .then(
        alert("Atualizado com sucesso!!"),
        updateAluno()
    )
    .catch(error => console.log(error))
}

function getCursos() {
    axios.get(`${url}/cursos`)
        .then(
            response => {

                const cursos = response.data.result;

                let html = '<option value="">Selecione uma opção</option>';

                for(let i = 0; i < cursos.length; i++){
                    html += `<option value="${cursos[i].idCurso}">${cursos[i].curso}</option>`;
                }

                document.getElementById('curso_select').innerHTML = html;

            }
            
        )
        .catch(error => console.log(error));

}

function getCursosBySelection() {

    let select = document.getElementById("curso_select");
    let option = select.options[select.selectedIndex].value;

    axios.get(`${url}/alunos/${option}`)
        .then(
            response => {
                
                const dados = response.data.result;
                
                let html = '';
            
                for(let i = 0; i < dados.length; i++){
                    html += `<tr>
                                <th scope="row">${dados[i].idAluno}</th>
                                <td>${dados[i].nome}</td>
                                <td>${dados[i].sobrenome}</td>
                                <td>${dados[i].telefone}</td>
                                <td>${dados[i].email}</td>
                                <td><button class="btn btn-success" onclick="updateAluno(${dados[i].idAluno})">Editar</button></td>
                                <td><button class="btn btn-danger" onclick="deleteAluno(${dados[i].idAluno})">Deletar</button></td>
                            </tr>`;
                }

                document.getElementById('table-body').innerHTML = html;
            }
        )
        .catch(error => console.log(error));
}