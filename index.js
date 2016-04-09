const hb = require('handlebars')
const fs = require('fs')
const path = require('path')
const parse = require( 'csv-parse/lib/sync' )
const _ = require('lodash')

// Parse the csv
const csv = path.resolve( __dirname, 'data', 'bathrooms.csv' )
const bathrooms = parse(fs.readFileSync(csv), { columns: true })

const indexTemplate = fs.readFileSync('templates/index.hbs').toString();
const template = hb.compile(indexTemplate);

const tmplData = { cities: [] };

_(bathrooms)
  .groupBy('city')
  .forEach(function(bathrooms, city){
    bathrooms.forEach( ( b ) => {
      switch( b.linkType ) {
        case 'instagram':
          b.icon = 'social-instagram-outline.svg'
          break

        case 'twitter':
          b.icon = 'social-twitter.svg'
          break

        case 'facebook':
          b.icon = 'social-facebook.svg'
          break

        case 'www':
          b.icon = 'android-favorite.svg'
          break
      }
    })

    tmplData.cities.push({ city, bathrooms })
  });

const html = template(tmplData);
fs.writeFileSync('dist/index.html', html);
