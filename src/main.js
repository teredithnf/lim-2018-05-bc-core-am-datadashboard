
const divCohorts = document.getElementById("divCohorts");

const btnCohorts = document.getElementById('btnCohorts');

btnCohorts.addEventListener ('click', (e) => {
    e.preventDefault();
    getListCohorts();
 });

 getListCohorts = () => {
     let cohortsPromise = fetch('../data/cohorts.json').then((response)=>{
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error('ocurriò un error!');
        }
     });

     cohortsPromise.then((jsonCohorts) => {
        //console.log(jsonCohorts);
        if (divCohorts){
            let filas = "";
            jsonCohorts.forEach((cohort, index) => {
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
     });
 }

showUsersByCohorts = (cohortName) => {

    let cohortsPromise = fetch('../data/cohorts.json').then((response)=>{
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error('ocurriò un error!');
        }
     });

    let usersPromise = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json').then((response)=>{
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error('ocurriò un error!');
        }
     });

     let progressPromise = fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json').then((response)=>{
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error('ocurriò un error!');
        }
     });

     let cohorts, users, progress = [];
     cohortsPromise.then((jsonCohorts) => {
        cohorts = jsonCohorts;
        return usersPromise;
     }).then((jsonUsers)=>{
        users = jsonUsers;
        return progressPromise;
     }).then((jsonProgress)=>{
        progress = jsonProgress;

        let userCohorts = users.filter((usuario) => {
            return usuario.signupCohort === cohortName;
        }); 
        
        let cohort = cohorts.find(item => item.id === cohortName);
        let search = null; // por defecto es null, luego filtrará el nombre de los usuarios 
        let orderBy = 'NOMBRE'; // por defecto es NOMBRE, podría ser TOTAL, EXERCISES, QUIZZES, QUIZZES_AVG, READS
        let orderDirection = 'ASC'; //por defecto es ASC, y podria ser DESC  
    
        let options = {
            cohort: cohort,
            cohortData: {
                users: userCohorts,
                progress: progress
            },
            orderBy: orderBy,
            orderDirection: orderDirection,
            search: search
        }
                            
        let userWithStats =  processCohortData(options);
    
        let filas = "";
        userWithStats.forEach((user, index) => {
            filas = filas + "<tr onClick='showUserProgress(\""+user.id+"\")' ><th scope='row'>"+(index+1)+"</th><td>"+user.name+"</td><td>"+user.stats.percent+"</td><td>"+user.stats.exercises.percent+"</td><td>"+user.stats.quizzes.percent+"</td><td>"+user.stats.reads.percent+"</td></tr>";
        });
    
        let tablaUsers = 
        "<table class='table'>"+
        "<thead class='thead-dark'>"+
        "    <tr>"+
        "        <th scope='col'>#</th>"+
        "        <th scope='col'>User Name</th>"+
        "        <th scope='col'>Progress %</th>"+
        "        <th scope='col'>Exercises %</th>"+
        "        <th scope='col'>Quizzes %</th>"+
        "        <th scope='col'>Reads %</th>"+
        "    </tr>"+
        "</thead>"+
        "<tbody>"+
        filas
        "</tbody>"+
        "</table>";
    
        divCohorts.innerHTML = tablaUsers;            

    });
};