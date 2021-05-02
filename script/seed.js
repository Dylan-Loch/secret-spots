'use strict'

const {db, models: {User, Spot} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  const spots = await Promise.all([
    Spot.create({
      id: 1,
      title: 'Elk Creek Hot Spring',
      location: '39.572, -106.164',
      category: 'hot-spring',
      description: 'Small natural hot spring, about 1.5 miles from the trailhead. Big enough for 5-6 people',
      notes: 'Access road may be closed in winter',
    }),
    Spot.create({
      id: 2,
      title: 'Skyscraper Glacier',
      location: '39.956, -105.688',
      category: 'ski',
      description: 'Steep glacier that stays skiable through summer. Descent of about 750 vertical feet',
      notes: 'Six mile hike required. There is some cliff jumping at the lake at the bottom',
    }),
  ])

  await spots[0].setUser(users[0]);
  await spots[1].setUser(users[0]);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
