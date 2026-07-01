// --- MAIN JS ENTRY POINT --- //

import ToDoList from "./ToDoList.js";
import ToDoItem from "./ToDoItem.js";

const toDoList = new ToDoList();

/* App Init */

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Add listeners
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    });

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", () => {
        if (toDoList.getList().length) {
            openClearModal();
        }
    });

    const modalCancel = document.getElementById("modalCancel");
    modalCancel.addEventListener("click", closeClearModal);

    const modalConfirm = document.getElementById("modalConfirm");
    modalConfirm.addEventListener("click", () => {
        toDoList.clearList();
        updatePersistentData(toDoList.getList());
        closeClearModal();
        refreshThePage();
    });

    const modalBackdrop = document.querySelector(".modal__backdrop");
    modalBackdrop.addEventListener("click", closeClearModal);

    // Procedural
    loadListObject();
    refreshThePage();
};

/* Persistence */

const loadListObject = () => {
    const storedList = localStorage.getItem("myToDoList");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDoList.addItemToList(newToDoItem);
    });
};

const updatePersistentData = (listArray) => {
    localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

/* Render */

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    updateEmptyState();
    clearItemEntryField();
    setFocusOnItemEntry();
};

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = toDoList.getList();
    list.forEach(item => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const li = document.createElement("li");
    li.className = "list-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "list-item__checkbox";
    checkbox.id = item.getId();
    checkbox.tabIndex = 0;
    checkbox.setAttribute("aria-label", `Mark "${item.getItem()}" as done`);
    addClickListenerToCheckbox(checkbox);

    const label = document.createElement("label");
    label.className = "list-item__label";
    label.htmlFor = item.getId();
    label.textContent = item.getItem();

    li.appendChild(checkbox);
    li.appendChild(label);

    const container = document.getElementById("listItems");
    container.appendChild(li);
};

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        const removedText = getLabelText(checkbox.id);
        const listItem = checkbox.closest(".list-item");

        // Animate off, then remove
        if (listItem) {
            listItem.classList.add("is-checking-off");
        }

        setTimeout(() => {
            toDoList.removeItemFromList(checkbox.id);
            updatePersistentData(toDoList.getList());
            updateScreenReaderConfirmation(removedText, "removed from list");
            refreshThePage();
        }, 400);
    });
};

const getLabelText = (checkboxId) => {
    return document.getElementById(checkboxId).nextElementSibling.textContent;
};

/* Empty State */

const updateEmptyState = () => {
    const emptyState = document.getElementById("emptyState");
    const list = toDoList.getList();
    if (list.length === 0) {
        emptyState.classList.add("is-visible");
        emptyState.removeAttribute("aria-hidden");
    } else {
        emptyState.classList.remove("is-visible");
        emptyState.setAttribute("aria-hidden", "true");
    }
};


/* Form Helpers */

const clearItemEntryField = () => {
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
};

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDoList.addItemToList(toDoItem);
    updatePersistentData(toDoList.getList());
    updateScreenReaderConfirmation(newEntryText, "added");
    refreshThePage();
};

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if (list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};

/* Clear Modal */

const openClearModal = () => {
    const modal = document.getElementById("clearModal");
    const page = document.querySelector(".page");
    modal.removeAttribute("inert");
    modal.classList.add("is-open");
    page.setAttribute("inert", "");
    page.setAttribute("aria-hidden", "true");
    document.getElementById("modalCancel").focus();
};

const closeClearModal = () => {
    const modal = document.getElementById("clearModal");
    const page = document.querySelector(".page");
    modal.setAttribute("inert", "");
    modal.classList.remove("is-open");
    page.removeAttribute("inert");
    page.removeAttribute("aria-hidden");
    document.getElementById("clearItems").focus();
};

/* Screen Reader Confirmation */

const updateScreenReaderConfirmation = (newEntryText, actionVerb) => {
    const item = newEntryText.length > 15 ? "item" : newEntryText;
    document.getElementById("confirmation").textContent = `${item} ${actionVerb}.`;
};