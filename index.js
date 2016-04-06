const kml = require('gtran-kml')
const hb = require('handlebars')
const fs = require('fs')
const index = fs.readFileSync('templates/index.hbs').toString();

const template = hb.compile(index);

kml.toGeoJson('data/bathrooms.kml')
.then(function (json) {
  const html = template(json.features);
  fs.writeFileSync('dist/index.html', html);
});

