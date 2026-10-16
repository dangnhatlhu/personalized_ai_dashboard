const clock = document.querySelector("#clock");
const todayLabel = document.querySelector("#today-label");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskPriority = document.querySelector("#task-priority");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const taskSearch = document.querySelector("#task-search");
const themeToggle = document.querySelector("#theme-toggle");

const storageKey = "personalized-ai-dashboard-tasks";
const themeStorageKey = "personalized-ai-dashboard-theme";
const validPriorities = new Set(["high", "normal", "low"]);

function loadTasks() {
  try {
    const storedTasks = window.localStorage.getItem(storageKey);
    if (storedTasks === null) return [];

    const parsedTasks = JSON.parse(storedTasks);
    if (!Array.isArray(parsedTasks) || parsedTasks.some((task) =>
      typeof task?.text !== "string" ||
      typeof task.completed !== "boolean" ||
      (task.priority !== undefined && !validPriorities.has(task.priority))
    )) {
      throw new Error("Stored tasks must be an array of task text and completion states.");
    }
    return parsedTasks.map((task) => ({
      ...task,
      priority: task.priority ?? "normal",
    }));
  } catch (error) {
    console.error("Unable to load tasks from LocalStorage.", error);
    return [];
  }
}

const tasks = loadTasks();
let searchQuery = "";

function saveTasks() {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    console.error("Unable to save tasks to LocalStorage.", error);
  }
}

function loadTheme() {
  try {
    return window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Unable to load theme from LocalStorage.", error);
    return "light";
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#171a17" : "#f6f5f1";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Bật chế độ sáng" : "Bật chế độ tối");
  themeToggle.querySelector(".theme-toggle-icon").textContent = isDark ? "☀" : "☾";
  themeToggle.querySelector(".theme-toggle-label").textContent = isDark ? "Chế độ sáng" : "Chế độ tối";
}

function saveTheme(theme) {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    console.error("Unable to save theme to LocalStorage.", error);
  }
}

function updateClock() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
  todayLabel.textContent = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
}

function updateCount() {
  const total = tasks.length;
  taskCount.replaceChildren("Bạn có ");

  const count = document.createElement("strong");
  count.textContent = String(total);
  taskCount.append(count, " công việc");
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item priority-${task.priority}`;
  if (task.completed) item.classList.add("is-complete");

  const checkbox = document.createElement("input");
  checkbox.className = "task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Đánh dấu "${task.text}" đã hoàn thành`);
  checkbox.addEventListener("change", () => {
    setTaskCompleted(task, text, checkbox, item, checkbox.checked);
  });

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;
  text.classList.toggle("completed", task.completed);
  text.addEventListener("click", () => {
    setTaskCompleted(task, text, checkbox, item, !task.completed);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Xóa "${task.text}"`);
  deleteButton.textContent = "Xóa";
  deleteButton.addEventListener("click", () => {
    deleteButton.disabled = true;
    const taskIndex = tasks.indexOf(task);
    if (taskIndex !== -1) tasks.splice(taskIndex, 1);
    saveTasks();
    updateCount();
    item.classList.add("is-removing");

    const finishRemoval = () => {
      window.clearTimeout(removalTimer);
      item.remove();
      if (!taskList.querySelector(".task-item")) renderTasks();
    };
    item.addEventListener("transitionend", (event) => {
      if (event.target === item && event.propertyName === "opacity") finishRemoval();
    }, { once: true });
    const removalTimer = window.setTimeout(finishRemoval, 250);
  });

  item.append(checkbox, text, deleteButton);
  return item;
}

function setTaskCompleted(task, text, checkbox, item, completed) {
  task.completed = completed;
  checkbox.checked = completed;
  text.classList.toggle("completed", completed);
  item.classList.toggle("is-complete", completed);
  saveTasks();
}

function renderTasks() {
  taskList.replaceChildren();
  const normalizedQuery = searchQuery.toLocaleLowerCase("vi");
  const visibleTasks = tasks.filter((task) =>
    task.text.toLocaleLowerCase("vi").includes(normalizedQuery)
  );

  if (visibleTasks.length === 0 && tasks.length === 0) {
    taskList.append(emptyState);
  } else if (visibleTasks.length === 0) {
    const noResults = document.createElement("li");
    noResults.className = "search-empty";
    noResults.textContent = "Không tìm thấy công việc phù hợp.";
    taskList.append(noResults);
  } else {
    for (const task of visibleTasks) taskList.append(createTaskElement(task));
  }
  updateCount();
}

taskSearch.addEventListener("input", () => {
  searchQuery = taskSearch.value.trim();
  renderTasks();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    window.alert("Vui lòng nhập nội dung!");
    taskInput.focus();
    return;
  }

  tasks.push({ text, completed: false, priority: taskPriority.value });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskPriority.value = "normal";
  taskInput.focus();
});

applyTheme(loadTheme());
updateClock();
window.setInterval(updateClock, 1000);
renderTasks();
