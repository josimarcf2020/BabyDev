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
                                <td><button class="btn btn-success" onclick="">Editar</button></td>
                                <td><button class="btn btn-danger" onclick="deleteAluno(${dados[i].id})">Deletar</button></td>
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