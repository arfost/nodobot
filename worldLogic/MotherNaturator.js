paramsFromFileOrObject = require('../classUtilities/Utilities.js').paramsFromFileOrObject
const random = require('../classUtilities/Utilities.js').random

module.exports = class extends paramsFromFileOrObject{
    constructor(params){
        super(params)
        console.log("mother nature ready to create life")
    }

    createFirstGeneration(){
        this.bots = [];
        for(let i = 0; i < this.params.generationSize; i++){
            this.bots.push(this.createNewBot(i, 0))
        }
        console.log(this.bots)
    }

    createNewBot(indice, generationNumber){
        let bot = {
            name:"botty_" + generationNumber + "_" + (indice+1),
            chromosomes :[]
        }
        let chromosomeNumber = random(this.params.minChromosome, this.params.maxChromosome)

        for(let i = 0; i < chromosomeNumber; i++){
            let chromosome = []
            let geneNumber = random(this.params.geneByChromosoneMin, this.params.geneByChromosoneMax)
            for(let i = 0; i < geneNumber; i++){
                chromosome.push(this.params.genePool[random(this.params.genePool.length) - 1])
            }
            bot.chromosomes.push(chromosome)
        }
        return bot
    }

    //list of needed params
    get neededParams() {
        return [
            "generationSize",
            "genePool",
            "minChromosome",
            "maxChromosome",
            "geneByChromosoneMin",
            "geneByChromosoneMax"
        ]
    }

    //class name for errors and other dev related messages
    get className() {
        return "MotherNaturator"
    }
}