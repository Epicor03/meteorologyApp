const express = require('express');
const log4js = require('log4js');
const cors = require('cors');
const ejs = require('ejs');


log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: '../logs/logs.log' }
  },
  categories: {
    default: { appenders: ['console','file'], level: 'debug' },
  }
});
var logger = log4js.getLogger(); 

// Create Express app
const app = express();
app.use(cors());
app.set('view engine', 'ejs');

let cities = [
  {
    id: '1',
    name: 'London',
    temperature: '30',
    temperaturesToday:[11, 12, 13, 12, 18,12,22,25,30,30,35,32,33,35,25,25,20,20,20,19,15,13,12,11],
    startDay: {hour:'6',unit:'am'},
    endDay:{hour:'9',unit:'pm'}
  },
  {
    id: '2',
    name: 'Lisbon',
    temperaturesToday:[5, 13, 13, 12, 18,18,18,20,20,20,20,20,20,20,20,18,18,18,18,15,15,13,12,11],
    temperature: '35',
    startDay: {hour:'7',unit:'am'},
    endDay:{hour:'6',unit:'pm'}
  },
  {
    id: '3',
    name: 'Paris',
    temperature: '25',
    temperaturesToday:[5, 6, 6, 6, 9,10,10,10,10,10,10,9,9,9,9,9,20,7,6,5,5,5,5,5],
    startDay: {hour:'6',unit:'am'},
    endDay:{hour:'8',unit:'pm'}
  },
  {
    id: '4',
    name: 'Madrid',
    temperature: '30',
    temperaturesToday:[11, 12, 13, 12, 18,12,22,25,30,30,35,32,33,35,25,25,20,20,20,19,15,13,12,11],
    startDay: {hour:'6',unit:'am'},
    endDay:{hour:'8',unit:'pm'}
  },
  {
    id: '5',
    name: 'NewYork',
    temperature: '15',
    temperaturesToday:[11, 12, 13, 12, 18,12,22,25,30,30,35,32,33,35,25,25,20,20,20,19,15,13,12,11],
    startDay: {hour:'10',unit:'am'},
    endDay:{hour:'10',unit:'pm'}
  },



];

// getting all cities
app.get('/cities', (req, res) => {
    logger.info('All cities are available');
   return res.send(cities);
});

app.get('/city/temperatures',(req, res) => {
  const cityChosen = cities.find(element => element.name === req.query.city);
 // Render index page
  return res.render('chartTemp', {


      // EJS variable and server-side variable
      title:req.query.city,
      temperatures:cityChosen.temperaturesToday
  });
});


// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))