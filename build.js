const task = process.argv[2]
const fs = require('fs')
const path = require('path')
const kml = require('gtran-kml')
const log = console.log.bind(console)
const hb = require('handlebars')
const _ = require('lodash')

const geoJson = './data/bathrooms.json'
const kmlSrc = './data/bathrooms.kml'

switch (task) {
  case "kml2geojson":
    kml2GeoJson()
    break

  case "index":
    index()
    break

  case "bathrooms":
    bathrooms()
    break

  default:
   console.log( 'Usage: node build.js task' )
   break
}

function kml2GeoJson () {
  kml.toGeoJson(kmlSrc)
  .then(function (json) {
    const features = JSON.stringify(json, null, ' ')
    log(`Wrote ${json.features.length} bathrooms to ${GEO_JSON}`)
    fs.writeFileSync(geoJson, features)
  })
}

function index () {
  const file = fs.readFileSync('templates/index.hbs')
  const template = hb.compile(file.toString())
  const bathrooms = JSON.parse(fs.readFileSync('data/bathrooms.json'))

  const cities = _(bathrooms)
    .groupBy('city')
    .map(function (city) { 
      return { 
        name: city[0].city,
        bathrooms: city
      }
    })
    .sortBy('name')
    .value()
   
  fs.writeFileSync('dist/index.html', template({ 
    cities: cities.slice(1),
  }))
}

function bathrooms () {
  const file = fs.readFileSync('templates/bathroom.hbs')
  const bathrooms = JSON.parse(fs.readFileSync('data/bathrooms.json'))
  const template = hb.compile(file.toString())

  fs.writeFileSync('dist/bathroom.html', template({
    bathroom: bathrooms[0],
  }))
}

