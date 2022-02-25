const addElement = document.querySelector('.btn_save');
const inputValue = document.querySelector('.input');
const todoList = document.querySelector('.todo_list');
const inputDate = document.querySelector('.inputDate');
const datePick = document.querySelector('.picker_date');
const datePicker = document.querySelector('.date_picker');
const todoInputs = document.querySelectorAll('.item_text');

inputDate.setAttribute('value', today());
datePick.setAttribute('value', today());

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
    const nowDate = today();
    if (inputValue.value === '') {
        alert('Enter your task!');
    } else {
        todos.push(TodoItem(inputValue.value, nowDate));
        setToStorage();
        renderTodoList();
        inputValue.value = '';
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
    setToStorage();
}

const deleteTodo = i => {
    todos.splice(i, 1);
    setToStorage();
    renderTodoList();
}

const editText = (e) => {
    const inputId = e.target.id;
    const value = e.target.value;
    todos[inputId].text = value;
    setToStorage();
}

const sortDate = () => {
    const sortedTodo = todos.filter(todo => datePick.value === todo.date);
    renderTodoList(sortedTodo);
}

datePicker.addEventListener('click', sortDate);