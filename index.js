const Universator = require('./worldLogic/Universator.js')

let motherNatureParams = {
    generationSize: 20,
    genePool : "abcd",
    minChromosome: 1,
    maxChromosome: 3,
    geneByChromosoneMin: 2,
    geneByChromosoneMax: 5
}




let univers = new Universator(motherNatureParams)