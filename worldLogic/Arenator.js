var console = logger('arenator');

ParamsFromFileOrObject = require('arfost-ntools').ParamsFromFileOrObject

module.exports = class extends ParamsFromFileOrObject{
    constructor(params) {
        super(params)
        console.log("arenator ready to test all the things")
    }

    //list of needed params
    get neededParams() {
        return []
    }

    //class name for errors and other dev related messages
    get className() {
        return "Arenator"
    }

    //fonction de calcul des performances de chaque bots
    compet(generation) {
        for (var bot of generation) {
            var score = this._evaluateBot(bot);
            bot.score = score
        }
        return generation
    }

    _evaluateBot(bot) {
        console.info(`bot ${bot.name} calcul du score : `)
        console.log(`nb chromosomes : ${bot.chromosomes.length}`)
        var totalScore = 0;
        for (var chromosome of bot.chromosomes) {
            console.log(`   chromosome : ${chromosome}`)
            var score = 0;
            for (var gene of chromosome) {
                var value = 0;
                if (gene === 'a') {
                    value = -1;
                } else if (gene === "c") {
                    value = 1;
                }
                score += value;
                console.log(`       value gene actuelle : ${value}, score total : ${score}`)
            }
            totalScore += score;
            console.log(`   score bot avec ce gene : ${score}, score total : ${totalScore}`)
        }
        var finalScore = Math.round(totalScore / bot.chromosomes.length);
        //var finalScore = totalScore
        console.log(`score total du bot : ${finalScore} pour : ${totalScore}/${bot.chromosomes.length}`)
        return finalScore;
    }
}