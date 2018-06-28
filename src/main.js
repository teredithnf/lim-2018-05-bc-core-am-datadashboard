
//mostrar datos (manipulacion del XHR)
/*..........................Funcion para llamar cohorts...................*/
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

const addCohorts = (event) => {
    const listCohort =JSON.parse(event.target.responseText);
    listCohort.forEach(cohor =>{
        let li = document.createElement('li');
        li.innerHTML = cohor.id;
        li.id = cohor.id;
        listCohorts.appendChild(li);
        li.addEventListener('click',(event)=>{ 
          //console.log(event.target);
          if (event.target.id === 'lim-2018-03-pre-core-pw') {
            getListStudent(event.target.id);
          }
          else alert('No hay Usuarios!  :( ');
        });
    })
  }
/*.............. Funcion para llamar lista de Usuarios..................*/
const listStudents = document.getElementById('list');

 const getListStudent = (nameCohort) => {
    let students = new XMLHttpRequest();
    students.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    students.onload = (event)=>{   
      const usuarios =JSON.parse(event.target.responseText);
      let arrayNames=[];
      usuarios.forEach(user => { 
        if (nameCohort === user.signupCohort){
             arrayNames.push(students);
               let li = document.createElement('li');
               li.className = 'studentClass';
               li.innerText = user.name;
               listStudents.appendChild(li);
          }
            } );};
    students.onerror = error;
    students.send();
  }
  

const error = () =>  console.log ('Se ha presentado un error');


/*..................Funcion para filtrar los usuarios por cohorts............*/

const getStudentsByCohort = (nameCohort) => {
let arrayByCohort
}
/*
getJSON(cohortsUrl, (cohorts) => {
  getJSON(usersUrl, (users) => {
    getJSON(progressUrl, (progress) => {
      console.log(users, cohorts, progress)
    })
  })
}) 
 */