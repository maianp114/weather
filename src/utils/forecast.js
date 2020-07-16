const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f49295a1452fbb058dbccdfe3a6de4a&query='+latitude+','+longitude

    request({url,json:true},(error,{body}) => {
        if(error){
            console.log(error);
            callback('Unable to connect to weather to service');
        }else if(body.error){
            console.log(body.error);
            callback('Unable to find location');
        }
        else{
            const {temperature,feelslike} = body.current;
            callback(undefined,`It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`);
        }
    });
}

module.exports = forecast;