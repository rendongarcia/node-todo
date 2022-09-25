const Task = require('./task');
const colors = require('colors');
const clrTheme = require('../config/colorsConfig');

colors.setTheme(clrTheme());

class Tasks {
    _list = {};

    get listArr() {
        const the_list = [];
        Object.keys(this._list).forEach(key => the_list.push(this._list[key]));
        return the_list;
    }

    constructor() {
        this._list = {};
    }

    newTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromArray(tasks = []) {
        this._list = {};
        tasks.map(task => this._list[task.id] = Task.newTaskWithID(task.desc, task.id, task.dateCompleted));
        return true;
    }


    listTasks(state = 'all') {
        console.log('');
        let taskCount = 0;
        this.listArr.forEach((task) => {

            if ((state === 'all') || (state === 'pending' && !task.dateCompleted) || (state === 'completed' && task.dateCompleted)) {
                taskCount += 1;
                const idx = `${taskCount}`.taskOpts;
                const { desc, dateCompleted } = task;
                let taskState = '';
                switch (state) {
                    case 'all':
                        taskState = (dateCompleted) ? `:: ${'Completed'.taskCompleted}` : ` :: ${'Pending'.taskPending}`;
                        break;

                    case 'pending':
                        taskState = (dateCompleted) ? 'Completed'.taskCompleted : 'Pending'.taskPending;
                        break;

                    case 'completed':
                        taskState = `${dateCompleted.taskCompleted}`;
                }

                console.log(`${idx}. ${desc} ${taskState}`);
            }
        });
        console.log('');
    }

    listAllCompleted() {
        this.listTasks('completed');
    }

    listAllPending() {
        this.listTasks('pending');
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.dateCompleted) {
                task.dateCompleted = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].dateCompleted = null;
            }
        })
    }
}

module.exports = Tasks;