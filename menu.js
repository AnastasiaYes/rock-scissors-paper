import readlineSync from 'readline-sync';

export default class Menu {
    constructor(totalCases) {
        this.option = null;
        this.totalCases = totalCases;
        this.playGame = false;
        this.showHelp = false;
        this.exitProgram = false;
    }

    start() {
        this.showMenu();

        let successProcessed = false;
        while (!successProcessed) {
            this.requestOption()
            successProcessed = this.processOption();
        }
    }

    showMenu() {
        console.log('Available moves:')
        for (let i = 0; i < this.totalCases.length; i++) {
            console.log(((i + 1) + '. ' + this.totalCases[i]))
        }
        console.log("0. Exit");
        console.log("?. help");
    }

    requestOption() {
        this.option = readlineSync.question('Choose an option: ');
    }

    processOption() {

        this.exitProgram = false;
        this.playGame = false;
        this.showHelp = false;

        if (this.option ===  '?') {
            this.showHelp = true;
            return true;
        }

        if (this.option ===  '0') {
            this.exitProgram = true;
            return true;
        }
        if (Number(this.option - 1) in this.totalCases) {
            this.playGame = true;
            return true;
        }
        return false;
    }

    getUserIndexChoice() {
        return this.option - 1;
    }

}