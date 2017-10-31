const MotherNaturator = require('./MotherNaturator.js')
const Arenator = require('./Arenator.js')

module.exports = class {
    constructor(motherNatureParam, arenatorParam){
        this.motherNature = new MotherNaturator(motherNatureParam)
        this.arenator = new Arenator(arenatorParam)
        this.motherNature.createFirstGeneration();
        this.datas = new UniversatorDataSavior();
        this.generationNumber = 0;
        console.log("the universe is here")
    }

    //provoque le lancement de la compétition
    launchCompetition(){

        if(this.competResult){
            throw "mother earth not ready for compet, create a new génération first"
        }else{
            var generation = this.motherNature.getActualGeneration();
            this.competResult = this.arenator.compet(generation);
            return competResult;
        }
    }

    createNewGeneration(){
        if(this.competResult){
            var oldGeneration = this.motherNature.createNewGeneration(this.competResult);
            this.datas.pushGeneration(oldGeneration);
            this.competResult = null;
            this.generationNumber++;
        }else{
            throw "can't create a new generation without competResult first"
        }
    }

}



//simple in memory data savior
//should be extended to add more capabilities, like persistance, or better requests
class UniversatorDataSavior {
    constructor(){
        this.datas = []
    }

    //add a new json representation of a generation
    pushGeneration(generation){
        this.datas.push(generation)
    }


    //renvoi une génération
    getGeneration(generationNumber){
        return this.datas[generationNumber];
    }

    //renvoie toutes les données de générations
    getAllGenerations(){
        return this.datas;
    }


    //chercher une donnée spécifique dans l'ensemble des générations
    //format de la query "path/subpath:value"
    getDatasFromQuery(query){
        throw "not implemented yet"
    }
}