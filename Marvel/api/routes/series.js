const express = require('express');
const router = express.Router();

var marvel = require('../../config/marvel_config');
const api = require('marvel-api');

router.get('/allSeries', (req, res) => {
    marvel.series.findAll(100, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        else{
            //console.log(result);
            var series = [];
            for(var i=0; i<result.data.length; i++){
                series[i] = {
                    id: result.data[i].id,
                    title: result.data[i].title,
                    description: result.data[i].description,
                    startYear: result.data[i].startYear
                }
            }
            res.json({
                success: true,
                series: series
            })
        }
    })
});

router.get('/seriesByName', (req, res) => {
    var series = req.body.series;

    marvel.series.findByTitle(series, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        else{
            console.log(result.data);
            var series = [];
            for(var i=0; i<result.data.length; i++){
                series[i] = {
                    id: result.data[i].id,
                    title: result.data[i].title,
                    description: result.data[i].description,
                    startYear: result.data[i].startYear,
                    img: result.data[i].thumbnail
                }
            }
            res.json({
                success: true,
                series: series
            })
        }
    })
})

module.exports = router;