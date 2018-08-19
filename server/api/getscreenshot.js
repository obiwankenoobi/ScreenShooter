const express = require('express')
const axios = require('axios')
const router = express.Router()
const mongoose = require('../../db/mongoose')

const {File} = require('../../db/models/File.js')
const fs = require('fs')



router.get('/:url', (req, res) => {
    const url = req.params.url;
    console.log(url)
    console.log('streaming file')

    File.
        findOne({ name:url}, 'file').
        cursor().
        on('data', (doc) => { 
            res.set("Content-Type", "image/png")
            res.write(doc.file)
        }).
        on('end', () => { 
            res.end()
            console.log('Done!'); 
        });

})

module.exports = router
