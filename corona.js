const request = require('request')

const Covid = (country, callback) => {
  const url = `https://disease.sh/v3/covid-19/countries/${country}`
  request({url : url, json : true}, (error, {body} = {}) => {
    if(error){
      callback('Unable to connect to internet', undefined)
    }
    else if(body.message){
      callback('Unable to find the country', undefined)
    }
    else{
      callback(undefined, {
        totalCases: body.cases,
        todayCases: body.todayCases,
        deaths: body.deaths,
        activeCases: body.active
      })
    }
  })
}

module.exports = Covid