logger = require('stealthLog')('logConfigprout.json');
var console = logger('index', "conf3");
const Universator = require('./worldLogic/Universator.js')

let motherNatureParams = {
    generationSize: 20,
    genePool : "abc",
    minChromosome: 1,
    maxChromosome: 3,
    geneByChromosoneMin: 2,
    geneByChromosoneMax: 5,
    toKeep: 5,
    toReproduce: 10
}




let univers = new Universator(motherNatureParams)
univers.launchCompetition()
console.log('toto')
console.warn('tata')