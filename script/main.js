const addElement = document.querySelector('.btn_save');
const inputValue = document.querySelector('.input');
const todoList = document.querySelector('.todo_list');
const inputDate = document.querySelector('.inputDate');
const dateForSort = document.querySelector('.dateForSort');
const datePicker = document.querySelector('.date_picker');

inputDate.setAttribute('value', getCurrentDate());
dateForSort.setAttribute('value', getCurrentDate());

let todos;

if (localStorage.todos) {
    todos = JSON.parse(localStorage.getItem('todos'));
} else {
    todos = [];
}

let todoItems = [];

const TodoItem = (text, date) => {
    return {
        text,
        date,
        complete: false,
    }
}

addElement.addEventListener('click', () => {
    const nowDate = getCurrentDate();
    if (!inputValue.value) {
        alert('Enter your task!');
    } else {
        todos.push(TodoItem(inputValue.value, nowDate));
        setToStorage(todos);
        renderTodoList();
        inputValue.value = '';
        dateForSort.value = nowDate;
    }
})

renderTodoList();

const completeTodo = i => {
    todos[i].complete = !todos[i].complete;
    if (todos[i].complete) {
        todoItems[i].classList.add('checked');
    } else {
        todoItems[i].classList.remove('checked');
    }
    setToStorage(todos);
}

const deleteTodo = i => {
    todos.splice(i, 1);
    setToStorage(todos);
    renderTodoList();
}

const editText = (e) => {
    const inputId = e.target.id;
    const value = e.target.value;
    todos[inputId].text = value;
    setToStorage(todos);
}

const sortDate = () => {
    const sortedTodo = todos.filter(todo => dateForSort.value === todo.date);
    renderTodoList(sortedTodo);
}

datePicker.addEventListener('click', sortDate);