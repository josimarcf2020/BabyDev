const url = "http://localhost:3000/api";

function createAluno() {

    let nome        = document.getElementById("nome").value;   
    let sobrenome   = document.getElementById("sobrenome").value;
    let telefone    = document.getElementById("telefone").value;
    let email       = document.getElementById("email").value;
    let select      = document.getElementById("curso-select");

    let opcao       = select.options[select.selectedIndex].value;

    const data = {
        "nome"      : nome,
        "sobrenome" : sobrenome,
        "telefone"  : telefone,
        "email"     : email,
        "idCurso"   : opcao
    }

    axios.post(`${url}/alunos`, data)
        .then(
            response => { 
                console.log(request.data.result)
            }
        )
        .catch(error => console.log(error))

}

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

                let html = `<option disabled selected>Selecione uma opção</option>`;

                for(let i = 0; i < cursos.length; i++){
                    html += `<option value="${cursos[i].idCurso}">${cursos[i].curso}</option>`;
                }

                document.getElementById('curso-select').innerHTML = html;

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