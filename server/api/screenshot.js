const express = require('express')
const axios = require('axios')
const router = express.Router()
const mongoose = require('../../db/mongoose')
const Binary = require('mongodb').Binary;
const {File} = require('../../db/models/File.js')
const Screenshot = require('../../Helpers/takeScreenshot')
const config = require('../../server/config.js')

router.get('/', (req, res) => {

    let { url , device } = req.query

    let width = 0;
    let height = 0;

    if (device == 'phone') {
        width = 414;
        height = 736;
    } 
    if (device == 'desktop') {
        width = 1024;
        height = 768;
    }

    url = url.replace('https://'.toLocaleLowerCase(), '')
    url = url.replace('http://'.toLocaleLowerCase(), '')
    let validate = url.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    let validateWWW = url.match(/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    if (validateWWW || validate) {
        Screenshot({ 
            url: `http://${url}`,
            width:width,
            height:height
        })
            .then(img => {
                if (img != 'no such page') {
                    console.log('this is img', img)
                    let nameArr = url.split('.')
                    console.log(nameArr)
                    let name;
                    console.log(nameArr)
                    nameArr[0].toLocaleLowerCase() == 'www' ? name = nameArr[1] : name = nameArr[0] // check if the user used www and assing the name by that
                    console.log(name)
                     
                    File.findOne({name:`${name}-${device}`}, (e, fileFounded) => {
                        if (e) {res.send(e)}
                        if (fileFounded) {res.send(fileFounded)}
                        else {
                            let time = new Date().getTime()
                            let newImage = new File({
                                name:`${name}-${device}-${time}.png`,
                                file: Binary(img), // creating and saving the image as binary buffer..
                            })
                            newImage.save((e, doc) => {
                                if (e) res.send(e)
                                else if (doc) res.send({
                                    name:`${name}-${device}.png`,
                                    link:`${config.server}/getscreenshot/${name}-${device}-${time}.png`
                                })
                            })
                        }
                    })
                } else {
                    console.log('err fetching image')
                    res.send('invalid address')
                }
    
            })
    } else {
        console.log('invalid url')
        res.send('invalid url')
    }


})

module.exports = router


