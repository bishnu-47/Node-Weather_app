// console.log("Client Side js")

const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) =>{

    message1.textContent='Loading...';
    message2.textContent='';

    // data comming from app.js
    fetch('/weather?address='+search.value).then((response) =>{
        response.json().then(( {error , location , forecast} = {} ) =>{
            if(error){
                message1.textContent=error
            }else{
                message1.textContent=location;
                message2.textContent=forecast;
            }
        })
    })
    e.preventDefault()
})
