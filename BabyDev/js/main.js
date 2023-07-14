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

    axios.post(`${url}/aluno`, data)
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

                const data = response.data.result;
                
                let html = ''
            
                for(let i = 0; i < data.length; i++){
                    html += `<tr>
                                <th scope="row">${data[i].idAluno}</th>
                                <td>${data[i].nome}</td>
                                <td>${data[i].sobrenome}</td>
                                <td>${data[i].telefone}</td>
                                <td>${data[i].email}</td>
                                <td><button class="btn btn-secondary" onclick="redirect('${data[i].idAluno}', '${data[i].nome}', '${data[i].sobrenome}', '${data[i].telefone}', '${data[i].email}')">Editar</button></td>
                                <td><button class="btn btn-danger" onclick="deleteAluno(${data[i].idAluno})">Deletar</button></td>                            
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
    axios.put(`${url}/aluno/${aluno}`)
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

async function getCursosBySelection() {

    let select = document.getElementById('curso-select')
    let option = select.options[select.selectedIndex].value;

    axios.get(`${url}/alunos/${option}`)
        .then(
            response => {
                
                const data = response.data.result;
                
                let html = '';
            
                for(let i = 0; i < data.length; i++){
                    html += `<tr>
                                <th scope="row">${data[i].idAluno}</th>
                                <td>${data[i].nome}</td>
                                <td>${data[i].sobrenome}</td>
                                <td>${data[i].telefone}</td>
                                <td>${data[i].email}</td>
                                <td><button class="btn btn-secondary" onclick="redirect('${data[i].idAluno}', '${data[i].nome}', '${data[i].sobrenome}', '${data[i].telefone}', '${data[i].email}')">Editar</button></td>
                                <td><button class="btn btn-danger" onclick="deleteAluno(${data[i].idAluno})">Deletar</button></td>
                            </tr>`;
                }

                document.getElementById('table-body').innerHTML = html;
            }
        )
        .catch(error => console.log(error));
}

function redirect(id, nome, sobrenome, telefone, email) {
    window.location.href = `http://127.0.0.1:5500/BabyDev/editandoAluno.html?id=${id}&nome='${nome}&sobrenome='${sobrenome}&telefone='${telefone}&email='${email}`
}

function loadFields() {

    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("id").value         = urlParams.get('id');
    document.getElementById("nome").value       = urlParams.get('nome');
    document.getElementById("sobrenome").value  = urlParams.get('sobrenome');
    document.getElementById("telefone").value   = urlParams.get('telefone');
    document.getElementById("email").value      = urlParams.get('email');

}