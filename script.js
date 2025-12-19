// ==========================
// 1. Читання URL параметрів
// ==========================
const params = new URLSearchParams(window.location.search);

const lang = params.get("lang") || "uk";
const format = params.get("format") || "medium";
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
  medium: {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "numeric",
    second: "2-digit"
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
const timeLabelElement = document.getElementById("timeLabel");

function updatetimeLabel() {
  timeLabelElement.textContent = formatter.format(new Date());
}

updatetimeLabel();
setInterval(updatetimeLabel, 1000);
