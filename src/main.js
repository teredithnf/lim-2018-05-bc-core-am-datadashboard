/*Mostrar y manipular datos en pantalla
let llamarUsuarios = () => {
    let users = new XMLHttpRequest();
    users.open('GET', 'http://127.0.0.1:8887/cohorts/lim-2018-03-pre-core-pw/users.json', true);
    users.onload = (addUsers) => {
        //document.getElementById("myDiv").innerHTML = users.responseText;
        console.log('success: '+ users.responseText);
    };
    users.onerror = (error) => {
        document.getElementById("myDiv").innerHTML = 'Ocurrió un error al obtener la data';
        console.log( 'An error occurred', error );
    };
    users.send();
}

addUsers = () => {
    const data = JSON.parse(users.responseText);
    
}*/
const l = document.getElementById('listar');


l.addEventListener('click',(e) => {
    e.preventDefault();
   // responseConteiner.innerHTML = '';
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
    const data = JSON.parse(event.target)
    console.log(data);
}
const error = () => {
    console.log( 'An error occurred' );
}

