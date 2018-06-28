

let getRequests = () => {
    var s1 = location.search.substring(1, location.search.length).split('&'),
        r = {}, s2, i;
    for (i = 0; i < s1.length; i += 1) {
        s2 = s1[i].split('=');
        r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
    }
    return r;
};

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
    const cohortName = QueryString["cohortname"];
    document.getElementById('title1').innerHTML = "Lista de Usuarios con Cohort Name : "+cohortName;
}

let setTableUsersByCohort = () => {
    const cohortName = QueryString["cohortname"];
    let divUsersCohort = document.getElementById("divUsersCohort");
    if (divUsersCohort){
        let filas = "";

        let usuariosCohort = usuarios.filter((element) => {
            return element.signupCohort === cohortName;
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

const QueryString = getRequests();
let usuarios = [];
setTitulo();
getUserList();