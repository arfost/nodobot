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
            this.competResult = this.arenator.compet(this.motherNature.actualGeneration);
            return this.competResult;
        }
    }

    createNewGeneration(){
        if(this.competResult){
            var oldGeneration = this.motherNature.createNewGeneration(this.competResult);
            this.datas.pushGeneration(oldGeneration, score);
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
        return {
            generation: this.motherNature.actualGeneration,
            score: this.competResult
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
    pushGeneration(generation, score){
        this.datas.push(
            {
                generation: generation,
                score: score
            }
        )
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