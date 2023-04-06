import express from 'express'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

const index = express.Router()
let items = []

// Function starts here
async function getFormulaOneDrivers() {
  items = []
  
  try {
    // Fetch data from URL and store the response into a const
    const response = await fetch('https://www.formula1.com/en/drivers.html')
    // Convert the response into text
    const body = await response.text()

    const $ = cheerio.load(body)
  
    // Selecting Each col-12 class name and iterate through the list
    $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
      const rank = $(el).find('.rank').text()
      const points = $(el).find('.points > .f1-wide--s').text()
      const firstName = $(el).find('.listing-item--name > span:first').text()
      const lastName = $(el).find('.listing-item--name > span:last').text()
      const team = $(el).find('.listing-item--team').text()
      const photo = $(el).find('.listing-item--photo img').attr('data-src')

      items.push({
        rank,
        points,
        firstName,
        lastName,
        team,
        photo
      })

    })
    return items
  } catch (error) {
    console.log(error)
  }
}

// Index page
index.get('/', async (request, response) => {
  // Run function
  await getFormulaOneDrivers()
  console.log(items);
response.render('index', {items: items} )
})

export default index
