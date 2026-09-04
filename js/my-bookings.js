const BOOKINGS_KEY = "bookings";
const listContainer = document.getElementById("bookings-list");

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

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function cancelBooking(id) {
  const bookings = getBookings().filter((booking) => booking.id !== id);
  saveBookings(bookings);
  renderBookings();
}

function renderBookings() {
  const bookings = getBookings().sort((a, b) => {
    if (a.date !== b.date) {
      return a.date < b.date ? -1 : 1;
    }
    return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
  });

  listContainer.innerHTML = "";

  if (bookings.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <p>${t("myBookings.empty")}</p>
      <a href="booking.html" class="btn">${t("myBookings.bookBtn")}</a>
    `;
    listContainer.appendChild(emptyState);
    return;
  }

  bookings.forEach((booking) => {
    const card = document.createElement("article");
    card.className = "booking-card";
    card.innerHTML = `
      <div class="booking-card-header">
        <span class="booking-date">${formatDate(booking.date)}</span>
        <span class="booking-time">${booking.time}</span>
      </div>
      <dl class="booking-details">
        <div class="booking-detail-row">
          <dt>${t("myBookings.labelName")}</dt>
          <dd>${escapeHtml(booking.name)}</dd>
        </div>
        <div class="booking-detail-row">
          <dt>${t("myBookings.labelPhone")}</dt>
          <dd>${escapeHtml(booking.phone)}</dd>
        </div>
        <div class="booking-detail-row">
          <dt>${t("myBookings.labelGuests")}</dt>
          <dd>${escapeHtml(String(booking.guests))}</dd>
        </div>
        <div class="booking-detail-row">
          <dt>${t("myBookings.labelTable")}</dt>
          <dd>${escapeHtml(String(booking.table))}</dd>
        </div>
        ${booking.notes ? `
        <div class="booking-detail-row">
          <dt>${t("myBookings.labelNotes")}</dt>
          <dd>${escapeHtml(booking.notes)}</dd>
        </div>` : ""}
      </dl>
      <button type="button" class="btn btn-cancel" data-id="${booking.id}">${t("myBookings.cancelBtn")}</button>
    `;
    listContainer.appendChild(card);
  });
}

document.addEventListener("languagechange", renderBookings);

listContainer.addEventListener("click", (event) => {
  const cancelButton = event.target.closest(".btn-cancel");
  if (!cancelButton) {
    return;
  }
  const id = Number(cancelButton.dataset.id);
  cancelBooking(id);
});

migrateBookings();
renderBookings();
