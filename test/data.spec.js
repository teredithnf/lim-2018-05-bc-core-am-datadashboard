describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 1,
          percent: 50,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const userWithStats = computeUsersStats(users, progress, courses);

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const processed = sortUsers(userWithStats, 'NOMBRE', 'ASC');
      assert.equal( processed[0].name, 'adriana vizcarra paitán');
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const processed = sortUsers(userWithStats, 'NOMBRE', 'DESC');
      assert.equal( processed[0].name, 'Zurisadai Rosas Aramburú');
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const processed = sortUsers(userWithStats, 'TOTAL', 'ASC');
      assert.equal( processed[0].stats.percent, 0);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const processed = sortUsers(userWithStats, 'TOTAL', 'DESC');
      assert.equal( processed[0].stats.percent, 100);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC',() =>{
      const processed = sortUsers(userWithStats, 'EXERCISES', 'ASC');
      assert.equal(processed[0].stats.exercises.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC',() => {
      const processed = sortUsers(userWithStats, 'EXERCISES', 'DESC');
      assert.equal(processed[0].stats.exercises.percent,100);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC',() => {
      const processed = sortUsers(userWithStats, 'QUIZZES', 'ASC');
      assert.equal(processed[0].stats.quizzes.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',() => {
      const processed = sortUsers(userWithStats, 'QUIZZES', 'DESC');
      assert.equal(processed[0].stats.quizzes.percent,100);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      const processed = sortUsers(userWithStats, 'QUIZZES_AVG', 'ASC');
      assert.equal(processed[0].stats.quizzes.scoreAvg,0);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',() =>{
      const processed = sortUsers(userWithStats, 'QUIZZES_AVG', 'DESC');
      assert.equal(processed[0].stats.quizzes.scoreAvg,100);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      const processed = sortUsers(userWithStats, 'READS', 'ASC');
      assert.equal(processed[0].stats.reads.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () =>{
      const processed = sortUsers(userWithStats, 'READS', 'DESC');
      assert.equal(processed[0].stats.reads.percent,100);
    });

  });

  describe('filterUsers(users, filterBy)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const userWithStats = computeUsersStats(users, progress, courses);

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      const processed = filterUsers(userWithStats , 'TERESA');
      assert.equal( processed[0].name.toUpperCase().indexOf('TERESA') > -1, true);
    });

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      let options = {
        cohort: cohort,
        cohortData: {
            users: users,
            progress: progress
        },
        orderBy: 'NOMBRE',
        orderDirection: 'ASC',
        search: 'TERESA'
    }
    const processed = processCohortData(options);
    assert.equal( processed[0].name.toUpperCase().indexOf('TERESA') > -1, true);
    });

  });

});
