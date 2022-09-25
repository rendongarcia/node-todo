const { inquirerMenu, pause, readInput, listToDelete, confirmMessage, listToComplete } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/fileCRUD');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

colors = require('colors');


const main = async () => {
    console.clear();

    let opt = '';
    const tasks = new Tasks();
    const dbTasks = readDB();

    if (dbTasks) {
        tasks.loadTasksFromArray(dbTasks);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Task description:');
                tasks.newTask(desc);
                break;

            case '2':
                tasks.listTasks();
                break;

            case '3':
                tasks.listAllCompleted();
                break;

            case '4':
                tasks.listAllPending();
                break;

            case '5':
                const ids = await listToComplete(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;

            case '6':
                const id = await listToDelete(tasks.listArr);
                if (id !== '0') {
                    const ok = await confirmMessage('¿Are you sure?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log(`Successfully deleted task, id: ${id}`);
                    } else {
                        console.log('No task was deleted');
                    }
                }
                break;
        }

        saveDB(tasks.listArr);

        if (opt !== '0') await pause();

    } while (
        opt !== '0'
    );

    console.log('Hello');
}

main();