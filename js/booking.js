const form = document.getElementById("booking-form");
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");
const formMessage = document.getElementById("form-message");
const tableInput = document.getElementById("table");
const tableGrid = document.getElementById("table-grid");

const BOOKINGS_KEY = "bookings";
const TABLE_COUNT = 10;

function getBookings() {
  try {
    const stored = JSON.parse(localStorage.getItem(BOOKINGS_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function migrateBookings() {
  const bookings = getBookings();
  let changed = false;
  bookings.forEach((booking) => {
    if (!booking.table) {
      booking.table = 1;
      changed = true;
    }
  });
  if (changed) {
    saveBookings(bookings);
  }
}

migrateBookings();

function isSlotTaken(date, time, table) {
  return getBookings().some(
    (booking) => booking.date === date && booking.time === time && Number(booking.table) === Number(table)
  );
}

function getBookedTables(date, time) {
  if (!date || !time) {
    return [];
  }
  return getBookings()
    .filter((booking) => booking.date === date && booking.time === time && booking.table)
    .map((booking) => Number(booking.table));
}

const hasTableGrid = Boolean(tableGrid && tableInput);

function renderTableGrid() {
  if (!hasTableGrid) {
    return;
  }

  const bookedTables = getBookedTables(dateInput.value, timeSelect.value);
  let selected = tableInput.value ? Number(tableInput.value) : null;

  if (selected && bookedTables.includes(selected)) {
    selected = null;
    tableInput.value = "";
  }

  tableGrid.innerHTML = "";
  for (let num = 1; num <= TABLE_COUNT; num += 1) {
    const isTaken = bookedTables.includes(num);
    const cell = document.createElement("div");
    cell.className = "table-cell" + (isTaken ? " taken" : " free") + (selected === num ? " selected" : "");
    cell.dataset.table = String(num);
    cell.textContent = String(num);
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-pressed", String(selected === num));
    cell.setAttribute("aria-disabled", String(isTaken));
    if (!isTaken) {
      cell.tabIndex = 0;
    }
    tableGrid.appendChild(cell);
  }
}

function selectTable(num) {
  tableInput.value = String(num);
  renderTableGrid();
}

if (hasTableGrid) {
  tableGrid.addEventListener("click", (event) => {
    const cell = event.target.closest(".table-cell");
    if (!cell || cell.classList.contains("taken")) {
      return;
    }
    selectTable(Number(cell.dataset.table));
  });

  tableGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    const cell = event.target.closest(".table-cell");
    if (!cell || cell.classList.contains("taken")) {
      return;
    }
    event.preventDefault();
    selectTable(Number(cell.dataset.table));
  });

  dateInput.addEventListener("change", renderTableGrid);
  timeSelect.addEventListener("change", renderTableGrid);
  document.addEventListener("languagechange", renderTableGrid);

  renderTableGrid();
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

// Restrict date picker to today and later
const today = new Date();
const todayStr = today.toISOString().split("T")[0];
dateInput.min = todayStr;

// Populate time options: 10:00 - 23:00, 30 minute steps
for (let minutes = 10 * 60; minutes <= 23 * 60; minutes += 30) {
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const value = `${hh}:${mm}`;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  timeSelect.appendChild(option);
}

function showError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearErrors() {
  form.querySelectorAll(".field-error").forEach((el) => {
    el.textContent = "";
  });
}

function validateForm() {
  let isValid = true;

  const name = form.name.value.trim();
  if (!name) {
    showError("name", t("booking.errorName"));
    isValid = false;
  }

  const phone = form.phone.value.trim();
  if (!phone) {
    showError("phone", t("booking.errorPhone"));
    isValid = false;
  }

  const date = form.date.value;
  if (!date) {
    showError("date", t("booking.errorDate"));
    isValid = false;
  } else if (date < todayStr) {
    showError("date", t("booking.errorDatePast"));
    isValid = false;
  }

  const time = form.time.value;
  if (!time) {
    showError("time", t("booking.errorTime"));
    isValid = false;
  }

  const guests = Number(form.guests.value);
  if (!form.guests.value || guests < 1 || guests > 10) {
    showError("guests", t("booking.errorGuests"));
    isValid = false;
  }

  if (tableInput && !tableInput.value) {
    showError("table", t("booking.errorTable"));
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  showFormMessage("", "");

  if (!validateForm()) {
    return;
  }

  const date = form.date.value;
  const time = form.time.value;
  const table = tableInput ? Number(tableInput.value) : undefined;

  if (table !== undefined && isSlotTaken(date, time, table)) {
    showFormMessage(t("booking.slotTaken"), "error");
    renderTableGrid();
    return;
  }

  const booking = {
    id: Date.now(),
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    date,
    time,
    table,
    guests: Number(form.guests.value),
    notes: form.notes.value.trim()
  };

  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);

  showFormMessage(t("booking.success"), "success");

  setTimeout(() => {
    window.location.href = "my-bookings.html";
  }, 1500);
});
