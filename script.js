"use strict";

class Reminder {
  constructor(index, title, content, date, color) {
    this.index = index;
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
              <p>${this.formatDate(this.date)}</p>
            </div>
          </div>
    `;
    reminderElement.innerHTML = content;
    const reminderRenderBox = document.querySelector(
      ".reminders-box-" + (this.index % 2 == 0 ? "r" : "l")
    );
    reminderRenderBox.appendChild(reminderElement);
  }
  formatDate(d) {
    const date = new Date(d);
    const now = new Date();
    // const dateString = `${date.toLocaleTimeString()}`;
    const dateTime = `${date.getHours()}:${date.getMinutes()}`;
    if (
      now.getMonth() == date.getMonth() &&
      now.getFullYear() == date.getFullYear()
    ) {
      if (now.getDate() == date.getDate()) {
        return `Today, at ${dateTime}`;
      } else if (now.getDate() + 1 == date.getDate()) {
        return `Tomorrow, at ${dateTime}`;
      } else
        return `${this.getWeekDay(date)}. ${date
          .getDate()
          .toString()
          .padStart(2, "0")}.${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}, at ${dateTime}`;
    }
    return `${this.getWeekDay(
      date
    )}. ${date.toLocaleDateString()}, at ${dateTime}`;
  }
  getWeekDay(d) {
    const date = new Date(d);
    const weekday = date.getDay();
    switch (weekday) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
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
      (location.pathname === "/index.html" || location.pathname === "/") &&
      localStorage.getItem("reminders")
    ) {
      this.createReminderBoxes();
      this.readFromLocalStorage();
    }
  }

  createReminderBoxes() {
    const main = document.querySelector("main");
    main.classList.remove("empty");
    main.classList.add("home");
    ////
    const container = document.querySelector(".container");
    const remindersBox = document.createElement("div");
    remindersBox.classList.add("reminders-box");
    // left reminders
    const remindersBoxL = document.createElement("div");
    remindersBoxL.classList.add("reminders-box-l");
    remindersBox.appendChild(remindersBoxL);
    // right reminders
    const remindersBoxR = document.createElement("div");
    remindersBoxR.classList.add("reminders-box-r");
    remindersBox.appendChild(remindersBoxR);

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
    const reminder = new Reminder(0, title, content, date, color);
    this.reminders.push(reminder);
    this.saveInLocalStorage();
  }
  initCreateReminder() {
    const saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      this.createReminder();
      location.pathname = "/index.html";
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
      remindersShapes.forEach((reminderShape, index) => {
        const reminder = new Reminder(
          index + 1,
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
