const firebase = require('firebase');

firebase.initializeApp({
    databaseURL: 'https://erm-mastercheck-refacto.firebaseio.com'
});


logger = require('stealthLog')('logConfig.json');
var console = logger('index');
const Universator = require('./worldLogic/Universator.js')

let motherNatureParams = {
    generationSize: 20,
    genePool : "abc",
    minChromosome: 1,
    maxChromosome: 3,
    geneByChromosoneMin: 2,
    geneByChromosoneMax: 5,
    toKeep: 0,
    toReproduce: 10,
    evolParam:{
        newGene:5,
        newChromosome:10,
        swapGene:75
    }
}


var max = 2000;

let univers = new Universator(motherNatureParams)
async function round(){
    var geneKey = firebase.database().ref("/gene/").push().key
    for(var i = 0; i < max; i++){
        univers.launchCompetition()
        univers.createNewGeneration()
        console.info("generation "+i+" ready, sending to firebase")
        await Promise.all([
            firebase.database().ref("/gene/"+geneKey+"/"+i).set(univers.datas.lastGeneration),
            firebase.database().ref("/special/"+geneKey+"/best").set(univers.datas.betterEver),
            firebase.database().ref("/special/"+geneKey+"/worst").set(univers.datas.worstEver),
        ])
        
    }

    firebase.database().goOffline();
}

round()