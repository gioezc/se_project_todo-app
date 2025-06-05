class Todo{
    constructor(data, selector, handleCheck, handleDelete) {
        this._data = data;
        this._templateElement = document.querySelector(selector);
        this._handleCheck = handleCheck;
        this._handleDelete = handleDelete;
    }

    _setEventListeners() {
        this._todoCheckboxEl.addEventListener("change", () => {
            this._data.completed = !this._data.completed;
            this._handleCheck(this._data.completed);
        });

        this._todoDeleteBtn.addEventListener("click", () => {
            this._onDeleteButtonClick();
            this._handleDelete(this._data.completed);
        });
    }

    _generateCheckBoxEl() {
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
        this._todoCheckboxEl.checked = this._data.completed;
        this._todoCheckboxEl.id = `todo-${this._data.id}`;
        this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }

    _generateDeleteButtonEl() {
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    }

    _onDeleteButtonClick() {
        this._todoElement.remove();
    }

    _formatDueDate(dateString) {
        const dueDate = new Date(dateString);
        if (!isNaN(dueDate)) {
            return dueDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } else {
            return ""; // If the date is invalid
        }
    }

    getView() {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);

        const todoNameEl = this._todoElement.querySelector(".todo__name");
        const todoDate = this._todoElement.querySelector(".todo__date");
        

        todoNameEl.textContent = this._data.name;
        todoDate.textContent = `Due: ${this._formatDueDate(this._data.date)}`;
        
        this._generateCheckBoxEl();
        this._generateDeleteButtonEl();
        this._setEventListeners();

        return this._todoElement;
    }

    
}

export default Todo;