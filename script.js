"use strict";

class Reminder {
  constructor(title, content, date, color) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.color = color;
    if (location.pathname === "/index.html" || location.pathname === "/") {
      this.renderReminder();
    }
  }
  renderReminder() {
    const reminderElement = document.createElement("div");
    let content = `
     <div class="reminder" style="background-color: ${this.color}">
            <h4>${this.title}</h4>
            <div><p>${this.content}</p></div>
            <div class="date-box">
              <p>${this.date}</p>
            </div>
          </div>
    `;
    reminderElement.innerHTML = content;
    const remindersBox = document.querySelector(".reminders-box");
    remindersBox.appendChild(reminderElement);
  }
}

class Reminders {
  reminders = [];
  constructor() {
    if (location.pathname === "/edit.html") {
      this.readFromLocalStorage();
      this.initCreateReminder();
    }
    if (
      location.pathname === "/index.html" ||
      (location.pathname === "/" && localStorage.getItem("reminders"))
    ) {
      this.createRemindersBox();
      this.readFromLocalStorage();
    }
  }
  createRemindersBox() {
    const main = document.querySelector("main");
    main.classList.remove("empty");
    main.classList.add("home");
    ////
    const container = document.querySelector(".container");
    const remindersBox = document.createElement("div");
    remindersBox.classList.add("reminders-box");
    container.appendChild(remindersBox);
  }
  createReminder() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const date = document.getElementById("date").value;
    const color = this.getRandomColor();

    if (!title) {
      alert("Enter a title!");
      return;
    }
    if (!content) {
      alert("Enter a content!");
      return;
    }
    if (!date) {
      alert("Select a date!");
      return;
    }

    const reminder = new Reminder(title, content, date, color);
    this.reminders.push(reminder);
    this.saveInLocalStorage();
  }
  initCreateReminder() {
    const saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      this.createReminder();
    });
  }
  getRandomColor() {
    const colors = ["#FFA447", "#1ECCC3", "#FFA4A3", "#7ECBFF", "#FFA6C4"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  saveInLocalStorage() {
    localStorage.setItem("reminders", JSON.stringify(this.reminders));
  }
  readFromLocalStorage() {
    this.reminders = [];
    const localReminder = localStorage.getItem("reminders");
    if (localReminder) {
      const remindersShapes = JSON.parse(localStorage.getItem("reminders"));
      remindersShapes.forEach((reminderShape) => {
        const reminder = new Reminder(
          reminderShape.title,
          reminderShape.content,
          reminderShape.date,
          reminderShape.color
        );
        this.reminders.push(reminder);
      });
    }
  }
}

const reminders = new Reminders();
