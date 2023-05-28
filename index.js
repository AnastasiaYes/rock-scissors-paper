import Game from './game.js';
import Menu from './menu.js';
import HelpTable from './helpTable.js';
import HashKey from './hashKey.js';


const commandLineOptions = [...new Set(process.argv.splice(2))];

if (commandLineOptions.length % 2 === 0) {
    console.log('The number of parameters to be passed must be odd');
    process.exit(0);
}

for (let i = 0; i < commandLineOptions.length; i++) {
    if (commandLineOptions.length < 3) {
        console.log('The passed parameters must be greater than or equal to 3');
        process.exit(0);
    } else if (!(new RegExp(/^[A-Za-z0-9 ]+$/)).test(commandLineOptions[i])) {
        console.log('Cyrillic is forbidden')
        process.exit(0);
    }
}

let rand = Math.floor(Math.random() * commandLineOptions.length);

const secretKeyGeneration = new HashKey();
console.log('HMAC: ' + secretKeyGeneration.key(commandLineOptions[rand]));

const menu = new Menu(commandLineOptions);
menu.start();
const game = new Game(commandLineOptions);

if (menu.playGame) {
    game.play(commandLineOptions[menu.getUserIndexChoice()], commandLineOptions[rand]);
    console.log('Your move: ' + commandLineOptions[menu.getUserIndexChoice()]);
    console.log('Computer move: ' + commandLineOptions[rand]);
    switch (true) {
        case game.isDraw:
            console.log('Draw');
            break;
        case game.isUserWon:
            console.log('You win!')
            break;
        default:
            console.log('You lose')
            break;
    }
    console.log('HMAC key: ' + secretKeyGeneration.secretKey);
} else if (menu.showHelp) {
    const table = new HelpTable(commandLineOptions, game);
    table.show()
} else if (menu.exitProgram) {
    process.exit(0);
}

