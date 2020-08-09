const request=require('postman-request');


const forecast= (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=bbd5696fc04063e99bb96bb55926540d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({ url , json:true},(error,response,body)=>{
        if(error){
            callback('Unable to connect to Weather Server!',undefined);
        }else if(body.error){
            callback('Enter correct Coordinates',undefined);
        }else{
            callback(undefined,
                body.current.weather_descriptions[0] + '. The current temperatue is '+ body.current.temperature + ' degree C. And it feels like '+ body.current.feelslike +' degree C'
            );
        }
    });
}


module.exports = forecast;
