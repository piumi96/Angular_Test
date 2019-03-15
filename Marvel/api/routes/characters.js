const express = require('express');
const router = express.Router();

const api = require('marvel-api');
var marvel = require('../../config/marvel_config');

router.get('/allCharacters', (req, res) => {
    var names = [];
    marvel.characters.findAll(100, (err, results) => {
        if (err) {
            console.error(err);
            res.json({
                success: false
            })
        }
        else{
            console.log(results.data);
            for(var i=0; i<results.data.length; i++){
                names[i] = results.data[i].name;
                //console.log(results.data[i].name);
            }
            res.json({
                success: true,
                data: names
            })

        }
    });
});

router.get('/characterByName', (req, res) => {
    var name = req.body.name;

    marvel.characters.findByName(name, (err, results) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            })
        }
        else{
            console.log(results.data);
            if(results.length==0){
                res.json({
                    success: false,
                    exists: false
                })
            }
            else{
                res.json({
                    success: true,
                    id: results.data[0].id,
                    name: results.data[0].name,
                    description: results.data[0].description,
                    img: results.data[0].thumbnail
                });
            }
        }
    })
})

module.exports = router;