const addElement = document.querySelector('.btn_save');
const inputValue = document.querySelector('.input');
const todoList = document.querySelector('.todo_list');
const inputDate = document.querySelector('.inputDate');
const datePick = document.querySelector('.picker_date')
const datePicker = document.querySelector('.date_picker')

let day = new Date();
let curr_date = day.getDate();
let curr_month = '0' + (day.getMonth() + 1);
let curr_year = day.getFullYear();
let today = (curr_year + "-" + curr_month + "-" + curr_date);

inputDate.setAttribute('value', today)

let todos;

if (localStorage.todos) {
    todos = JSON.parse(localStorage.getItem('todos'))
} else todos = [];

let todoItems = [];

function TodoItem(text, date) {
    this.text = text;
    this.date = date;
    this.complete = false;
}

addElement.addEventListener('click', () => {
    let nowDate = today;
    todos.push(new TodoItem(inputValue.value, nowDate));
    setToStorage();
    renderTodoList();
    inputValue.value = ''
})

const setToStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const createTodoItem = (todo, i) => {
    return `
        <div class="todo_item ${todo.complete ? 'checked' : ''} ">
            <input class="item_text" type="text" id="${i}" value='${todo.text}' oninput="editText(event)">
            <input type="date" class="todo_date" value=${todo.date} disabled="disabled">
                <div class="buttons">
                    <input class ="btn_complete" onClick="completeTodo(${i})" type="checkbox" ${todo.complete ? 'checked' : ''}>
                    <button class="btn_delete" onClick="deleteTodo(${i})">delete</button>
                </div>
            </div>
        </div>
        `
}

const renderTodoList = (todosArr = todos) => {
    todoList.innerHTML = "";
    if (todosArr.length > 0) {
        todosArr.forEach((item, i) => {
            todoList.innerHTML += createTodoItem(item, i)
        });
        todoItems = document.querySelectorAll('.todo_item')
    }
}

renderTodoList();

const completeTodo = i => {
    todos[i].complete = !todos[i].complete;

    if (todos[i].complete) {
        todoItems[i].classList.add('checked')
    } else {
        todoItems[i].classList.remove('checked')
    }
    setToStorage();
    renderTodoList();

}

const deleteTodo = i => {
    console.log(i)
    todos.splice(i, 1)
    setToStorage();
    renderTodoList();
}

const todoInputs = document.querySelectorAll('.item_text')

const editText = (e) => {
    const inputId = e.target.id;
    const value = e.target.value;
    todos[inputId].text = value;
    setToStorage();
}

datePick.setAttribute('value', today);

const sortDate = () => {
    const sortedTodo = todos.filter(todo => datePick.value === todo.date)
    renderTodoList(sortedTodo);
}

datePicker.addEventListener('click', sortDate)