const express = require('express');
const https = require('https');
const app = express();

app.get('/', (req, res) => {
    
    let data = [];

    https.get('https://pokeapi.co/api/v2/pokemon', (response) => {
        if(response.statusCode !== 200) {
            console.log('Error: ' + response.statusCode);
        }else{
            response.on('data', (chunk) => {
                data.push(chunk);
            }).on('end', () => {
                data = Buffer.concat(data).toString();
                data = JSON.parse(data);
                console.log("data\n",data);
                res.json(data);
            });
        }
    })
 
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})