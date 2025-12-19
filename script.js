// ==========================
// 1. Читання URL параметрів
// ==========================
const params = new URLSearchParams(window.location.search);

const lang = params.get("lang") || "uk"; // uk за замовчуванням
const format = params.get("format") || "full";
const showSeconds = params.get("seconds") !== "false";
const timezone = params.get("timezone") || "Europe/Kyiv";

// ==========================
// 2. Формати відображення
// ==========================
const formats = {
  time: {
    hour: "2-digit",
    minute: "2-digit"
  },
  date: {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  },
  full: {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }
};

// якщо секунди вимкнені — прибираємо їх
if (!showSeconds && formats.full.second) {
  delete formats.full.second;
}

// ==========================
// 3. Створюємо форматер
// ==========================
const formatter = new Intl.DateTimeFormat(
  lang === "en" ? "en-US" : "uk-UA",
  {
    ...formats[format],
    timeZone: timezone
  }
);

// ==========================
// 4. Оновлення часу
// ==========================
const clockElement = document.getElementById("clock");

function updateClock() {
  clockElement.textContent = formatter.format(new Date());
}

updateClock();
setInterval(updateClock, 1000);
