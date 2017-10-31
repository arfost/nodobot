paramsFromFileOrObject = require('../classUtilities/Utilities.js').paramsFromFileOrObject

module.exports = class extends paramsFromFileOrObject{
    constructor(params){
        super(params)
        console.log("mother nature ready to create life")
    }

    createFirstGeneration(){
        console.log("init ok : ", this.params)
    }

    //list of needed params
    get neededParams() {
        return [
            "generationSize"
        ]
    }

    get className() {
        return "MotherNaturator"
    }
}