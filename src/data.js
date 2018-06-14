//obtener data y funciones que obtienen y manipulan los datosv

/*.............. usuarios y buscar ..................*/
const l = document.getElementById('listar');
const l2 = document.getElementById('submit-btn');
const r = document.getElementById('respuesta');
const b = document.getElementById('search-keyword');
let searchForText;

/*boton buscar*/
l2.addEventListener('click',(f) => {
    f.preventDefault();
    searchForText=b.value;
     getUser();
 });
 r
/*boton estudiante*/

l.addEventListener('click',(e) => {
   e.preventDefault();
    getUser();
});

getUser = () => {
    let users = new XMLHttpRequest();
    users.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    users.onload = succes;
    users.onerror = error;
    users.send();
}

const succes = (event) => {
   const usuarios =JSON.parse(event.target.responseText);
   for(let i=0;i<usuarios.length;i++)
     {
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = usuarios[i].name;
    r.appendChild(li);
     }  
    }

const error = () => {
   console.log( 'An error occurred' );
}
/*....................................................*/


// Funciones Solicitadas
window.computeUsersStats = (users, progress, courses) => {
    
}

window.sortUsers = (users, orderBy, orderDirection ) => {

}

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {

}