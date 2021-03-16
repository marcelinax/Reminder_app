"use strict";

class Reminder {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    // this.renderReminder();
  }

  renderReminder() {
    const reminderBox = document.createElement("div");

    let content = `
    <div class="reminder-box">
        <h5 class="title">${this.title}</h5>
        <p class="description">${this.description}</p>
        <p class="date">${this.date}</p>
    </div>
  `;

    reminderBox.innerHTML = content;
    //   return reminderBox;
  }
}

class Reminders {
  constructor() {
    if (location.pathname === "/edit.html") {
      this.initCreateReminder();
    }
  }
  createReminder() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("content").value;
    const date = document.getElementById("date").value;

    const re = new Reminder(title, description, date);

    console.log(re);
    // return re;
  }
  initCreateReminder() {
    const saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      this.createReminder();
    });
  }
}

const reminders = new Reminders();
