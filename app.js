const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const databasepath = path.join(__dirname, 'cricketMatchDetails.db')

const app = express()
app.use(express.json())
module.exports = app

let database = null

const initialize = async () => {
  try {
    database = await open({
      filename: databasepath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error ${e.message}`)
    process.exit(1)
  }
}

initialize()

//api 1

app.get('/players/', async (request, response) => {
  const getPlayerQuery = `
      SELECT
        *
      FROM
        player_details;`
  const listPlayer = await database.all(getPlayerQuery)
  response.send(listPlayer)
})

//api 2

app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const playerWithIdQuery = `
      SELECT
        *
      FROM
        player_details
      WHERE
        player_id = '${playerId}';`
  const playerIdResponse = await database.get(playerWithIdQuery)
  response.send(playerIdResponse)
})
