const fs = require('fs')
const filePath = './todo/tasks.json'


const loadTask = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filePath, dataJSON)
}

const addTask = (task) => {
    const tasks = loadTask()
    tasks.push({ task })
    saveTasks(tasks)
    console.log("Task added ", task)
}


const listTasks = () => {
    const tasks = loadTask()
    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`))
}


const removeTask = (index) => {
    const tasks = loadTask()

    if (index < 1 || index > tasks.length || isNaN(index)) {
        console.log("Invalid task number.")
        return
    }

    const removedTask = tasks.splice(index - 1, 1)

    saveTasks(tasks)

    console.log(`Task removed: ${removedTask[0].task}`)
}


const command = process.argv[2]
const argument = process.argv[3]

if (command === 'add') {
    addTask(argument)
}
else if (command === 'list') {
    listTasks()
}
else if (command === 'remove') {
    removeTask(parseInt(argument))
}
else {
    console.log('Invalid command. Please use "add", "list", or "remove".')
}



/** ------------------ EXAMPLES ------------------

Run from the project root.

Add a new task:
node todo/todo.js add "Learn Node.js"

Add another task:
node todo/todo.js add "Build a Todo App"

List all tasks:
node todo/todo.js list

Output:
1 - Learn Node.js
2 - Build a Todo App

Remove the first task:
node todo/todo.js remove 1

Output:
Task removed: Learn Node.js

List tasks again:
node todo/todo.js list

Output:
1 - Build a Todo App

------------------------------------------------ */
