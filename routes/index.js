import express from 'express'


const index = express.Router()


// Overzicht
index.get('/', (request, response) => {
   
  response.render('index')
})

export default index
