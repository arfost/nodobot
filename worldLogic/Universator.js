var console = logger('universator');

const MotherNaturator = require('./MotherNaturator.js')
const Arenator = require('./Arenator.js')

module.exports = class {
    constructor(motherNatureParam, arenatorParam){
        this.motherNature = new MotherNaturator(motherNatureParam)
        this.motherNature.createFirstGeneration();
        this.arenator = new Arenator(arenatorParam)
        this.datas = new UniversatorDataSavior();
        this.generationNumber = 0;
        console.log("the universe is here")
    }

    //provoque le lancement de la compétition
    launchCompetition(){

        if(this.competResult){
            throw "mother earth not ready for compet, create a new génération first"
        }else{
            this.arenator.compet(this.motherNature.actualGeneration)
            this.competResult = true;
        }
    }

    createNewGeneration(){
        if(this.competResult){
            var oldGeneration = this.motherNature.createNewGeneration();
            this.datas.pushGeneration(oldGeneration);
            this.competResult = false;
            this.generationNumber++;
        }else{
            throw "can't create a new generation without competResult first"
        }
    }

    getGeneration(genNumber){
        this.datas.getGeneration(genNumber)
    }

    get actualGeneration(){
        return this.motherNature.actualGeneration
    }

}



//simple in memory data savior
//should be extended to add more capabilities, like persistance, or better requests
class UniversatorDataSavior {
    constructor(){
        this.datas = []
        this.ref = {}
        this.betterEver;
        this.worstEver;
    }

    //add a new json representation of a generation
    pushGeneration(generation){
        for(let bot of generation){
            this.ref[bot.name] ? this.ref[bot.name].push(generation.length) : this.ref[bot.name] = [generation.length]
            if(!this.betterEver || this.betterEver.score < bot.score){
                this.betterEver = bot
            }
            if(!this.worstEver || this.worstEver.score > bot.score){
                this.worstEver = bot
            }
        }
        this.datas.push(generation)
    }


    //renvoi une génération
    getGeneration(generationNumber){
        return this.datas[generationNumber];
    }

    getSingleBot(botName){
        return this.datas.filter((el, index)=>{return this.ref[botName].indexOf(index) !== -1})
    }

    //renvoie toutes les données de générations
    getAllGenerations(){
        return this.datas;
    }

    getWorldStateComplete(){
        return {
            betterEver: this.betterEver,
            worstEver: this.worstEver,
            generations: this.datas
        }
    }

    get lastGeneration(){
        return this.datas[this.datas.length-1];
    }

    //chercher une donnée spécifique dans l'ensemble des générations
    //format de la query "path/subpath:value"
    getDatasFromQuery(query){
        throw "not implemented yet"
    }
}