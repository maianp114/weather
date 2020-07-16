const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require("express");
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
            title:'Weather App',
            name:'Anupong'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'about me',
        name:'Anupong'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'help page',
        name:'Anupong',
        helpText:'This is some helpfultext'
    })
})

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error:'You must provide address'
        })
      }else{
        geocode(address,(error,{latitude,longitude,location} = {}) => {
          if(error){
            return res.send({
                error
            })
          }
          forecast(latitude,longitude, (error, forecastData) => {
            if(error){
              return res.send({
                  error
              })
            }
                res.send({
                    location,
                    address,
                    forecast:forecastData
                })
          });
        });
      }
      
});

app.get('/products',(req,res) => {
    if(!req.query.serach){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.serach);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404page',{
        title:'Page 404',
        errorMessage:'Help article not found.',
        name:'Anupong'
    })
})

app.get('*',(req,res) => {
    res.render('404page',{
        title:'Page 404',
        errorMessage:'Page not found.',
        name:'Anupong'
    })
})

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
