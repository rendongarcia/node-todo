const clrTheme = () => {
    return ({
        titles: 'yellow',
        opts: ['yellow', 'bold'],
        highlight: ['cyan', 'italic'],
        taskOpts: ['green', 'bold'],
        taskPending: ['red'],
        taskCompleted: ['green', 'italic']
    });
}

module.exports = clrTheme;