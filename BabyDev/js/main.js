const url = "http://localhost:3000/api";

function getAlunos() {
    axios.get(url.concat("/alunos"))
        .then(
            response => {
                const alunos = JSON.stringify(response.data);
                listaDeAlunos.textContent = alunos;
            })
        .catch(
            error => console.log(error));
}

getAlunos();

function listaAlunos() {
    
}