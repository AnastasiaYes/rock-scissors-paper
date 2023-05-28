export default class HelpTable {
    constructor(totalCases, game) {
        this.totalCases = totalCases;
        this.game = game;
    }

    show() {
        const data = {};
        for (const elCase of this.totalCases) {
            data[elCase] = {};
            for (const childCase of this.totalCases) {
                this.game.play(elCase, childCase);
                data[elCase][childCase] = this.game.isUserWon ? 'WIN' : (this.game.isCampWon) ? 'LOSE' : 'DRAW'
            }
        }
        console.table(data);
    }
}