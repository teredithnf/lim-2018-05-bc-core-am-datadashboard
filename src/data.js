//obtener data y *funciones* que obtienen y manipulan los datos

// Funciones Solicitadas
window.computeUsersStats = (users, progress, courses) => {
    
    // crear objeto stats con valores por default
    let stats = {
        percent: 0,
        exercises: {
            total: 0,
            completed: 0,
            percent: 0
        },
        reads: {
            total: 0,
            completed: 0,
            percent: 0
        },

        quizzes: {
            total: 0,
            completed: 0,
            percent: 0, 
            scoreSum: 0,
            scoreAverage: 0
        }
    }

    //recorrer el array de users y a cada uno agregarle el atributo stats
    let userWithStats= users.map(function(user){ 
        user.stats = stats;

        //obtener el progreso del usuario desde el array progress
        let userProgress = progress[user.id];

        if(userProgress){

            // actualizar el objeto stats con los datos del progreso
            let percent = courses.reduce((suma, course) => {
                let userProgressCourses = userProgress[course];
                if(userProgressCourses){
                    return suma + userProgressCourses.percent;
                }
            },0);

            user.stats.percent = percent;

            //actualizar exercises, reads y quizzes

        }

        return user;
     });

     console.log('userWithStats: ',userWithStats);
    return userWithStats;
}

window.sortUsers = (users, orderBy, orderDirection ) => {

}

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {

}
