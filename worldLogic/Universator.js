const MotherNaturator = require('./MotherNaturator.js')

module.exports = class {
    constructor(){
        this.motherNature = new MotherNaturator()
        console.log("the universe is here")
    }
}