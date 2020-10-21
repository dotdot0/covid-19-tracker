

const form = document.getElementById('form')
const country = document.getElementById('country')
const totalCases = document.getElementById('totalCases')
const todayCases = document.getElementById('todayCases')
const totalDeaths = document.getElementById('deaths')
const activeCases = document.getElementById('activeCases')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const co = country.value
  totalCases.textContent = 'Loading....'
  todayCases.textContent = ''
  totalDeaths.textContent = ''
  activeCases.textContent = ''
  fetch('/covid?country=' + co).then((response) => {
    response.json().then((data) => {
      if(data.error){
        totalCases.textContent = data.error
        todayCases.textContent = ''
        totalDeaths.textContent = ''
        activeCases.textContent = ''
      }else{
        totalCases.textContent = 'Total Cases: ' + data.totalCases,
        todayCases.textContent = 'Today Cases: ' + data.todayCases,
        totalDeaths.textContent = 'Total Deaths: ' + data.deaths,
        activeCases.textContent = 'Active Cases: ' + data.activeCases
      }
    })
  })
})

