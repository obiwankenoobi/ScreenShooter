let mongoose = require('mongoose');

var FileSchema = mongoose.Schema({
    file:{type:Buffer},
    name:{type:String},
})

let File = mongoose.model("screenshot", FileSchema);
module.exports = {File};