const express = require('express')
const path = require('path')
const hbs = require('hbs')
const Covid = require('./corona')

const app = express();
const viewsPath = path.join(__dirname, '/templates/views')
const staticPath = path.join(__dirname, '/templates/views')
const port = process.env.PORT || 3000
const partialPath = path.join(__dirname, '/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(staticPath))
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Covid 19 Tracker',
    name: 'Pratush Rai'
  })
})

app.get('/about', (req, res) => {
  res.send('A simple covid 19 stats application')
})

app.get('/help', (req, res) => {
    res.send('Check Out My Github For Source Code https://github.com/pratushrai0309')
  })

app.get('/covid', (req, res) =>  {
  Covid(req.query.country, (error, {totalCases, todayCases, deaths, activeCases} = {}) => {
    if(req.query.country){
      if(error){
        res.send({
          error: error
        })
      }else{
        res.send({
          totalCases: totalCases,
          todayCases: todayCases,
          deaths: deaths,
          activeCases: activeCases
        })
      }
    }else{
      res.send({
        error: 'You should provide a name of the country'
      })
    }
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Pratush Rai'
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})