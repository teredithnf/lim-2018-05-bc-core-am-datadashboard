
//mostrar datos (manipulacion del XHR)

/*.............. Funcion para llamar lista de Cohorts..................*/


let cohortName;
const btnCohorts = document.getElementById('btnCohorts');

btnCohorts.addEventListener ('click', (e) => {
    e.preventDefault();
    getListCohorts();
 });

 /*Funcion para llamar cohorts */
getListCohorts = () => {
        let cohorts = new XMLHttpRequest();
        cohorts.open('GET', '../data/cohorts.json');
        cohorts.onload = addCohorts; 
        cohorts.onerror = error;
        cohorts.send();
      }

const addCohorts = (event) => {
    const listCohorts = JSON.parse(event.target.responseText);
    setTableCohorts(listCohorts);
}

const listDataProgress = document.getElementById('showProgress');
const btnDataProgress = document.getElementById('btnProgress');

btnDataProgress.addEventListener ('click', (e) => {
  e.preventDefault();
  });

getDataProgress = () => {
    let dataProgress = new XMLHttpRequest();
    dataProgress.open('Get','../data/cohorts/lim-2018-03-pre-core-pw/progress.json');
    dataProgress.onload = addDataProgress;
    dataProgress.onerror = error;
    dataProgress.send();
}

const addProgress = (event) => {
  const listDataProgress = JSON.parse(event.target.responseText);
  for(let i=0;i<listdataProgress.length;i++)
  {
         let li = document.createElement('li');
         li.className = 'showProgress';
         li.innerText = listDataProgress[i].intro.percent;
         listDataProgress.appendChild(li);
  }  
}

/*
generation.addEventListener('change',function(e){
  if (generation.value === 'lim-2018-03-pre-core-pw') {
      showStudents.innerHTML= '';
      addStudents();
  }else{
      alert('Sin datos para mostrar');
  }

});*/
        
let setTableCohorts = (listCohorts) => {
    let divCohorts = document.getElementById("divCohorts");
    if (divCohorts){
        let filas = "";
        listCohorts.forEach((cohort, index) => {
            filas = filas + "<tr onClick='showUsersByCohorts(\""+cohort.id+"\")' ><th scope='row'>"+(index+1)+"</th><td>"+cohort.id+"</td></tr>";
        });

        let tablaCohorts = 
        "<table class='table'>"+
        "<thead class='thead-dark'>"+
        "    <tr>"+
        "        <th scope='col'>#</th>"+
        "        <th scope='col'>Cohort Name</th>"+
        "    </tr>"+
        "</thead>"+
        "<tbody>"+
        filas
        "</tbody>"+
        "</table>";
    
        divCohorts.innerHTML = tablaCohorts;
    }
}

const error = () =>  console.log ('Se ha presentado un error');

const btnStudents = document.getElementById('btnStudent');


btnStudents.addEventListener ('click', (e) => {
e.preventDefault();
getUserList();
});

getUserList = () => {
    let students = new XMLHttpRequest();
    students.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    students.onload = userSucces;
    students.onerror = error;
    students.send();
  }
   
const userSucces= (event) => {
   const usuarios =JSON.parse(event.target.responseText);
  setTableUsersByCohort(usuarios, cohortName);  
}

const showUsersByCohorts = (cohortName) => {
    //window.open('/src/usersCohort.html?cohortName='+cohortName,'_self');
    //alert("si funciona "+cohortName);
    cohortName = cohortName;
    getUserList();
    // llamar usuarios
    // llamar a set table userByCohort

}

let setTableUsersByCohort = (usuarios,cohortName) => {
    
    let divUsersCohorts = document.getElementById("divCohorts");
    if (divUsersCohorts){
        let filas = "";

        let usuariosCohort = usuarios;
        if (cohortName !== undefined){
            usuariosCohort = usuarios.filter((usuario) => {
                return usuario.signupCohort === cohortName;
            });    
        }
       
        usuariosCohort.forEach((user, index) => {
            filas = filas + "<tr onClick='showUsersByCohorts(\""+user.id+"\")' ><th scope='row'>"+(index+1)+"</th><td>"+user.id+"</td><td>"+user.name+"</td></tr>";
        });

        let tablaUsers = 
        "<table class='table'>"+
        "<thead class='thead-dark'>"+
        "    <tr>"+
        "        <th scope='col'>#</th>"+
        "        <th scope='col'>User Id</th>"+
        "        <th scope='col'>User Name</th>"+
        "    </tr>"+
        "</thead>"+
        "<tbody>"+
        filas
        "</tbody>"+
        "</table>";
    
        divUsersCohorts.innerHTML = tablaUsers;
    }
}

/*const userId = (user.id) =>{
    let

}*/
/*const cohortName = getCohortName();
let usuarios = [];
getUserList();*/

