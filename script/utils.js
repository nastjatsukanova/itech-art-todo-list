const today = () => {
    const day = new Date();
    const currentDay = day.getDate();
    const currentMonth = '0' + (day.getMonth() + 1);
    const currentYear = day.getFullYear();

    return `${currentYear}-${currentMonth}-${currentDay}`;
}

const setToStorage = () => localStorage.setItem('todos', JSON.stringify(todos));

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

const renderTodoList = (renderTodos = todos) => {
    todoList.innerHTML = "";
    if (renderTodos.length > 0) {
        renderTodos.forEach((item, i) => {
            todoList.innerHTML += createTodoItem(item, i);
        });
        todoItems = document.querySelectorAll('.todo_item');
    }
}