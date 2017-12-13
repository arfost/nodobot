var console = logger('motherNaturator');

ParamsFromFileOrObject = require('arfost-ntools').ParamsFromFileOrObject
const random = require('arfost-ntools').random

module.exports = class extends ParamsFromFileOrObject {
    constructor(params) {
        super(params)
        console.log("mother nature ready to create life")
        this.generationNumber = 0
    }

    createFirstGeneration() {
        this.bots = [];
        for (let i = 0; i < this.params.generationSize; i++) {
            this.bots.push(this._createNewBot(i, this.generationNumber))
        }
    }

    _createNewBot(indice, generationNumber) {
        let bot = {
            name: "botty_" + generationNumber + "_" + (indice + 1),
            chromosomes: []
        }
        let chromosomeNumber = random(this.params.minChromosome, this.params.maxChromosome)

        for (let i = 0; i < chromosomeNumber; i++) {
            let chromosome = []
            let geneNumber = random(this.params.geneByChromosoneMin, this.params.geneByChromosoneMax)
            for (let i = 0; i < geneNumber; i++) {
                chromosome.push(this.params.genePool[random(this.params.genePool.length) - 1])
            }
            bot.chromosomes.push(chromosome)
        }
        return bot
    }

    _orderBots(){
        var bots = JSON.parse(JSON.stringify(this.bots));
        bots.sort((botInfoA, botInfoB) => {
            if(botInfoA.score !== undefined && botInfoB.score !==undefined){
                return botInfoB.score - botInfoA.score;
            }else{
                throw new Error("One or more bot didn't have score");
            }
        })

        return bots;
    }

    reproduceTwo(bot1, bot2) {
        let log = logger('repro')
        var child = JSON.parse(JSON.stringify(bot1))

        log.info(child.chromosomes.length+"::"+ bot2.chromosomes.length)
        if(child.chromosomes.length === 1){
            var rnd = random(bot2.chromosomes.length) -1
            var chromo = bot2.chromosomes[rnd]
            log.info("pushing aleatoire chromo from secondary mate", chromo, bot2.chromosomes, rnd)
            child.chromosomes.push(chromo)
        }else{
            for(var i = random(bot1.chromosomes.length); i > 0; i--){
                var chromo = bot2.chromosomes[random(bot2.chromosomes.length) -1]
                //log.info("echanging aleatoire chromo from secondary mate", chromo)
                child.chromosomes[random(child.chromosomes.length)-1] = chromo
            }
        }

        child.parents = [bot1.name, bot2.name]
        child.name = "child_"+this.generationNumber+"_"+random(0, 2000)
        return child;
    }

    mutateBot(bot){
        let evolParam = this.params.evolParam

        if(random(100) < evolParam.newGene){
            bot.chromosomes[random(bot.chromosomes.length)-1].push(this.params.genePool[random(this.params.genePool.length) - 1])
        }
        if(random(100) < evolParam.newChromosome){
            let chromosome = []
            let geneNumber = random(this.params.geneByChromosoneMin, this.params.geneByChromosoneMax)
            for (let i = 0; i < geneNumber; i++) {
                chromosome.push(this.params.genePool[random(this.params.genePool.length) - 1])
            }
            bot.chromosomes.push(chromosome)
        }
        if(random(100) < evolParam.swapGene){
            bot.chromosomes[random(bot.chromosomes.length)-1].push(this.params.genePool[random(this.params.genePool.length) - 1])
        }
    }

    createNewGeneration(results) {
        
        this.generationNumber++
        var bots = this._orderBots()
        console.log(`new Generation creation`, bots.reduce((curr, bot)=>curr + bot.name+";", ""))
        var newBots = [...bots.splice(0, this.params.toKeep)]
        console.log('Bots keeped : ', newBots.reduce((curr, bot)=>curr + bot.name+";", ""));

        var reproduced = 0;
        while(reproduced < this.params.toReproduce && bots.length > 0){
            let bot = bots.shift();
            console.log("reproducing new bot : ", bot.name)
            for(var partner of bots){
                console.log("    partner : ", partner.name)
                let copulation = this.reproduceTwo(bot, partner);
                console.log("    result : ", copulation.name)
                if(copulation){
                    newBots.push(copulation);
                    reproduced++
                    break;
                }
            }
        }
        console.info("begin filter")
        newBots = newBots.filter(bot=>{
            try{
                for(var chromosome of bot.chromosomes){
                    for(var gene of chromosome){
                        if(this.params.genePool.indexOf(gene) === -1){
                            throw new Error("Gene "+gene+" not in gene pool")
                        }
                    }
                }
            }catch(e){
                //console.error("bot ", bot, " caused error ", e)
                return false
            }
            this.mutateBot(bot)
            return true
        })

        while(newBots.length < this.params.generationSize){
            newBots.push(this._createNewBot(newBots.length, this.generationNumber))
        }
        console.log("new generation finished, ", newBots.reduce((curr, bot)=>curr + bot.name+";", ""));
        var oldBots = this.bots;
        this.bots = newBots;
        //console.info(this.bots)
        return oldBots;
    }

    get actualGeneration() {
        return this.bots
    }

    //list of needed params
    get neededParams() {
        return [
            "generationSize",
            "genePool",
            "minChromosome",
            "maxChromosome",
            "geneByChromosoneMin",
            "geneByChromosoneMax",
            "toKeep",
            "toReproduce",
            "evolParam"
        ]
    }

    //class name for errors and other dev related messages
    get className() {
        return "MotherNaturator"
    }
}