colors = require('colors');

colors.setTheme({
    titles: 'yellow',
    opts: ['red', 'bold'],
    highlight: ['cyan', 'italic']
});

const showMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('--------------------------------------'.titles);
        console.log('---           To do app            ---'.titles);
        console.log('---        Select an option        ---'.titles);
        console.log('--------------------------------------'.titles);

        let menu = `
${'1'.opts}. New task
${'2'.opts}. List all
${'3'.opts}. List completed tasks
${'4'.opts}. List pending tasks
${'5'.opts}. Complete task(s)
${'6'.opts}. Delete task(s)
${'0'.opts}. Exit`

        console.log(menu);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Select an option: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    });

}

const pause = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPress ${'ENTER'.highlight} to continue\n`, () => {
            readline.close();
            resolve();
        })
    });
}

module.exports = {
    showMenu, pause
}