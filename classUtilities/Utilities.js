module.exports.paramChecker = class {
    checkParams(params){
        let paramsGood = true;
        for(let param of this.neededParams){
            paramsGood = paramsGood && (typeof params[param] !== 'undefined');
        }

        if(!paramsGood)
            throw "invalid params, needed params are : " + this.neededParams.join(', ')
    }

    get neededParams(){
        throw "you must override neededParams with a getter returning an array of strings"
    }
}

module.exports.paramsFromFileOrObject = class ParamsFromFileOrObject extends module.exports.paramChecker{
    constructor(params){
        super()
        if(!params){
            throw "The class "+this.className+" need a path to a json file, or a json object as params"
        }
        if(typeof params === 'string'){
            params = require(params)
        }
        this.checkParams(params)

        this.params = params
    }
}