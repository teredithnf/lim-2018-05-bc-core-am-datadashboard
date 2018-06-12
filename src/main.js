
let llamarUsuarios = () => {
    let users = new XMLHttpRequest();
    users.open('GET', 'http://127.0.0.1:8080/cohorts/lim-2018-03-pre-core-pw/users.json', true);
    users.onload = () => {
        document.getElementById("myDiv").innerHTML = users.responseText;
        console.log('success: '+ users.responseText);
    };
    users.onerror = (error) => {
        document.getElementById("myDiv").innerHTML = 'Ocurrió un error al obtener la data';
        console.log( 'An error occurred', error );
    };
    users.send();
}
