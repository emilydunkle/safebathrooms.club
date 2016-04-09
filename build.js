const task = process.argv[2]
const fs = require('fs')
const path = require('path')
const kml = require('gtran-kml')
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
    console.log(`Wrote ${json.features.length} bathrooms to ${GEO_JSON}`)
    fs.writeFileSync(geoJson, features)
  })
}

