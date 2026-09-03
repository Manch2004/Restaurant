const form = document.getElementById("booking-form");
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");
const formMessage = document.getElementById("form-message");

const BOOKINGS_KEY = "bookings";

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

function isSlotTaken(date, time) {
  return getBookings().some((booking) => booking.date === date && booking.time === time);
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
    showError("name", "Խնդրում ենք նշել ձեր անունը։");
    isValid = false;
  }

  const phone = form.phone.value.trim();
  if (!phone) {
    showError("phone", "Խնդրում ենք նշել հեռախոսահամարը։");
    isValid = false;
  }

  const date = form.date.value;
  if (!date) {
    showError("date", "Խնդրում ենք ընտրել ամսաթիվը։");
    isValid = false;
  } else if (date < todayStr) {
    showError("date", "Ամսաթիվը չի կարող անցյալում լինել։");
    isValid = false;
  }

  const time = form.time.value;
  if (!time) {
    showError("time", "Խնդրում ենք ընտրել ժամը։");
    isValid = false;
  }

  const guests = Number(form.guests.value);
  if (!form.guests.value || guests < 1 || guests > 10) {
    showError("guests", "Մարդկանց քանակը պետք է լինի 1-ից 10 միջակայքում։");
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

  if (isSlotTaken(date, time)) {
    showFormMessage("Այս ժամը արդեն զբաղված է։", "error");
    return;
  }

  const booking = {
    id: Date.now(),
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    date,
    time,
    guests: Number(form.guests.value),
    notes: form.notes.value.trim()
  };

  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);

  showFormMessage("Ամրագրումը հաստատված է!", "success");

  setTimeout(() => {
    window.location.href = "my-bookings.html";
  }, 1500);
});
