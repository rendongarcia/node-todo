const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    dateCompleted = null;

    constructor(desc, id = '', dateCompleted = null) {
        this.id = id !== '' ? id : uuidv4();
        this.desc = desc;
        this.dateCompleted = (!dateCompleted) ? null : dateCompleted;
    }

    static newTaskWithID(desc, id, dateCompleted = null) {
        return new Task(desc, id, dateCompleted);
    }
}

module.exports = Task;