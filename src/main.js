
//mostrar datos (manipulacion del XHR)

/*.............. Funcion para llamar lista de Usuarios..................*/
const listStudents = document.getElementById('list');
const btnStudents = document.getElementById('btnStudent');

let cohorts = [];

btnStudents.addEventListener ('click', (e) => {
e.preventDefault();
getListStudent();
});

getListStudent = () => {
    let students = new XMLHttpRequest();
    students.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    students.onload = addStudents;
    students.onerror = error;
    students.send();
  }
   
const addStudents = (event) => {
   const usuarios =JSON.parse(event.target.responseText);
   for(let i=0;i<usuarios.length;i++)
     {
            let li = document.createElement('li');
            li.className = 'articleClass';
            li.innerText = usuarios[i].name;
            listStudents.appendChild(li);
     }  
}
const error = () =>  console.log ('Se ha presentado un error');

/*Funcion para llamar cohorts */
const btnCohorts = document.getElementById('btnCohorts');
const listCohorts = document.getElementById('listCohorts');

btnCohorts.addEventListener ('click', (e) => {
    e.preventDefault();
    getListCohorts();
 });
getListCohorts = () => {
        let cohorts = new XMLHttpRequest();
        cohorts.open('GET', '../data/cohorts.json');
        cohorts.onload = addCohorts; 
        cohorts.onerror = error;
        cohorts.send();
      }
const addCohorts = () => {
   cohorts =JSON.parse(event.target.responseText);
   console.log(cohorts);
   createCohortsTable();
     /*for(let i=0;i<usuarios.length;i++)
      {
             let li = document.createElement('li');
             li.className = 'articleClass';
             li.innerText = usuarios[i].name;
             listStudents.appendChild(li);
      }   */ 
}

const createCohortsTable = () => {

    let divCohorts = document.getElementById("divCohorts");
    if (divCohorts){
        let filas = "";
        cohorts.forEach((cohort, index) => {
            filas = filas + "<tr onClick='showUsersByCohorts(\""+cohort.id+"\")' ><th scope='row'>"+index+"</th><td>"+cohort.id+"</td><td>"+cohort.usersCount+"</td></tr>";
        });

        let tablaCohorts = 
        "<table class='table'>"+
        "<thead class='thead-dark'>"+
        "    <tr>"+
        "        <th scope='col'>#</th>"+
        "        <th scope='col'>Cohort Name</th>"+
        "        <th scope='col'>User Count</th>"+
        "    </tr>"+
        "</thead>"+
        "<tbody>"+
        filas
        "</tbody>"+
        "</table>";
    
        divCohorts.innerHTML = tablaCohorts;
    }

}

const showUsersByCohorts = (cohortName) => {
    window.open('/src/usersCohort.html?cohortName='+cohortName,'_self');
}
