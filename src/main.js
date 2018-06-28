
//mostrar datos (manipulacion del XHR)
const btnCohorts = document.getElementById('btnCohorts');

btnCohorts.addEventListener('click', (e) => {
    e.preventDefault();
    getListCohorts();
    //createCohortsTable();
});

getListCohorts = () => {
    let cohorts = new XMLHttpRequest();
    cohorts.open('GET', '../data/cohorts.json');
    cohorts.onload = addCohorts;
    cohorts.onerror = error;
    cohorts.send();
}

const addCohorts = () => {
    let cohorts = JSON.parse(event.target.responseText);
    console.log(cohorts);
    createCohortsTable(cohorts);
}

const error = () => console.log('Se ha presentado un error');

/*.............. Funcion para llamar lista de Usuarios..................*/
//const listStudents = document.getElementById('list');
const btnStudents = document.getElementById('btnStudent');

//let cohorts = [];

btnStudents.addEventListener('click', (e) => {
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
    const usuarios = JSON.parse(event.target.responseText);
    console.log(usuarios)
    /*for (let i = 0; i < usuarios.length; i++) {
        let li = document.createElement('li');
        li.className = 'articleClass';
        li.innerText = usuarios[i].name;
        listStudents.appendChild(li);
    }*/
}



getListProgress = () => {
    const progress = new XMLHttpRequest;
    progress.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
    progress.onload = addProgress;
    progress.onerror = error;
    progress.send();
}

const addProgress = (event) => {
    const progress = JSON.parse(event.target.responseText);
    console.log(progress);
}

  /* createCohortsTable();
     for(let i=0;i<usuarios.length;i++)
      {
             let li = document.createElement('li');
             li.className = 'articleClass';
             li.innerText = usuarios[i].name;
             listStudents.appendChild(li);
      }  
}*/

  const createCohortsTable = (cohorts) => {

    let divCohorts = document.getElementById("divCohorts");
    if (divCohorts){
        let filas = "";
        cohorts.forEach((cohort, index) => {
            //filas = filas + "<tr onClick='showUsersByCohorts(\""+cohort.id+"\")' ><th scope='row'>"+index+"</th><td>"+cohort.id+"</td><td>"+cohort.usersCount+"</td></tr>";
            filas = filas + "<tr><th scope='row'>"+(index+1)+"</th><td>"+cohort.id+"</td></tr>";
        });

        let tablaCohorts = 
        "<table class='table table-hover'>"+
        "<thead class='thead-dark'>"+
        "    <tr>"+
        "        <th scope='col'>#</th>"+
        "        <th id='ancho' scope='col'>Cohort Name</th>"+
        "    </tr>"+
        "</thead>"+
        "<tbody>"+
        filas
        "</tbody>"+
        "</table>";
    
        divCohorts.innerHTML = tablaCohorts;
    }

}

/*const showUsersByCohorts = (cohortName) => {
    window.open('/src/usersCohort.html?cohortName='+cohortName,'_self');
}*/
