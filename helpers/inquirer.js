const inquirer = require('inquirer');
const colors = require('colors');
const clrTheme = require('../config/colorsConfig');

colors.setTheme(clrTheme());

const menuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: [
            {
                value: '1',
                name: `${'1'.opts}. ${'New task'}`
            },
            {
                value: '2',
                name: `${'2'.opts}. List all`
            },
            {
                value: '3',
                name: `${'3'.opts}. List completed tasks`
            },
            {
                value: '4',
                name: `${'4'.opts}. List pending tasks`
            },
            {
                value: '5',
                name: `${'5'.opts}. Mark task(s) as completed`
            },
            {
                value: '6',
                name: `${'6'.opts}. Delete task(s)`
            },
            {
                value: '0',
                name: `${'0'.opts}. Exit`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('--------------------------------------'.titles);
    console.log('---           To do app            ---'.titles);
    console.log('--------------------------------------'.titles);

    const { option } = await inquirer.prompt(menuQuestions);

    return option;

}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.highlight} to continue\n`
        }
    ]

    const result = await inquirer.prompt(question);
    return result;
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a valid input';
                }
                return true;
            }
        }
    ]

    const { description } = await inquirer.prompt(question);
    return description;
}


const listToDelete = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        return {
            value: task.id,
            name: `${String(index + 1).taskOpts}. ${task.desc} :: ${task.dateCompleted ? 'Completed'.taskCompleted : 'Pending'.taskPending}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${'0'.taskOpts}. ${'Abort'.highlight}`
    })
    const deleteList = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a task to delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(deleteList);
    return id;
}

const confirmMessage = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


const listToComplete = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        return {
            value: task.id,
            //name: `${String(index + 1).taskOpts}. ${task.desc} :: ${task.dateCompleted ? 'Completed'.taskCompleted : 'Pending'.taskPending}`,
            name: `${String(index + 1).taskOpts}. ${task.desc}`,
            checked: (task.dateCompleted) ? true : false
        }
    });

    const tasksList = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select a task to delete',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(tasksList);
    return ids;
}

module.exports = {
    inquirerMenu, pause, readInput, listToDelete, confirmMessage, listToComplete
}