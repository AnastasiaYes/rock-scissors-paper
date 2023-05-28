export default class Game {
    constructor(totalCases) {
        this.totalCases = totalCases;
        this.isDraw = false;
        this.isCampWon = false;
        this.isUserWon = false;
    }

    play(userChoice, compChoice) {
        const count = this.getCountWonCases();
        const casesUser = this.getWonCases(userChoice, count);
        const casesComp = this.getWonCases(compChoice, count);
        this.pickWinner(casesUser, userChoice, casesComp, compChoice);
    }

    getCountWonCases() {
        return Math.floor(this.totalCases.length / 2);
    }

    getWonCases(choice, count) {
        let indexChoice = this.totalCases.indexOf(choice);
        let nextIndex = indexChoice;
        const cases = [];

        while (count !== 0) {
            count--;
            nextIndex = this.getNextIndex(nextIndex)
            cases.push(this.totalCases[nextIndex]);
        }
        return cases;
    }

    getNextIndex(indexChoice) {
        if (indexChoice === this.totalCases.length - 1) {
            return 0;
        }
        return indexChoice + 1;
    }

    pickWinner(userCases, userChoice, compCases, compChoice) {
        this.isDraw = false
        this.isCampWon = false
        this.isUserWon = false
        if (~userCases.indexOf(compChoice)) {
            this.isUserWon = true;
        } else if (userChoice === compChoice) {
            this.isDraw = true;
        } else {
            this.isCampWon = true;
        }
    }


}