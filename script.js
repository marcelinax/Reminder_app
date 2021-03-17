"use strict";

class Reminder {
  constructor(title, content, date) {
    this.title = title;
    this.content = content;
    this.date = date;
    if (location.pathname === "/index.html") {
      this.renderReminder();
    }
  }
  renderReminder() {
    const main = document.querySelector("main");
    main.classList.remove("empty");
    main.classList.add("home");
    const container = document.querySelector(".container");
    const remindersBox = document.createElement("div");
    remindersBox.classList.add("reminders-box");

    container.appendChild(remindersBox);
    let content = `
     <div class="reminder">
            <h4>${this.title}</h4>
            <div><p>${this.content}</p></div>
            <div class="date-box">
              <p>${this.date}</p>
            </div>
          </div>
    `;
    remindersBox.innerHTML = content;
    return remindersBox;
  }
}

class Reminders {
  reminders = [];
  constructor() {
    this.readFromLocalStorage();
    if (location.pathname === "/edit.html") {
      this.initCreateReminder();
    }
  }
  createReminder() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const date = document.getElementById("date").value;

    const re = new Reminder(title, content, date);
    this.reminders.push(re);
    this.saveInLocalStorage();
  }
  initCreateReminder() {
    const saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      this.createReminder();
    });
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
          reminderShape.date
        );
        this.reminders.push(reminder);
      });
    }
  }
}

const reminders = new Reminders();
