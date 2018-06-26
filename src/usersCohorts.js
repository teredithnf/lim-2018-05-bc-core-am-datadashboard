
let getCohortName = () => {
    let KeyValueCohort = location.search.substring(1,location.search.length).split('=');
    return KeyValueCohort[1];
}


let getUserList = () => {
    let students = new XMLHttpRequest();
    students.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    students.onload = userSuccess;
    students.onerror = userError;
    students.send();
  }
   
let userSuccess = (event) => {
    usuarios =JSON.parse(event.target.responseText); 
    console.log(usuarios);
    setTableUsersByCohort();
}

let userError = () =>  console.log ('Se ha presentado un error');

let setTitulo = () => {
    document.getElementById('title1').innerHTML = "Lista de Usuarios con Cohort Name : "+cohortName;
}

let setTableUsersByCohort = () => {
    
    let divUsersCohort = document.getElementById("divUsersCohort");
    if (divUsersCohort){
        let filas = "";

        let usuariosCohort = usuarios.filter((usuario) => {
            return usuario.signupCohort === cohortName;
        });

        usuariosCohort.forEach((user, index) => {
            filas = filas + "<tr onClick='showUsersByCohorts(\""+user.id+"\")' ><th scope='row'>"+index+"</th><td>"+user.id+"</td><td>"+user.name+"</td><td>"+user.role+"</td></tr>";
        });

        let tablaUsers = 
        "<table class='table'>"+
        "<thead class='thead-dark'>"+
        "    <tr>"+
        "        <th scope='col'>#</th>"+
        "        <th scope='col'>User Id</th>"+
        "        <th scope='col'>User Name</th>"+
        "        <th scope='col'>User Role</th>"+
        "    </tr>"+
        "</thead>"+
        "<tbody>"+
        filas
        "</tbody>"+
        "</table>";
    
        divUsersCohort.innerHTML = tablaUsers;
    }
}

const cohortName = getCohortName();
let usuarios = [];
setTitulo();
getUserList();