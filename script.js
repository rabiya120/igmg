const CAL = {
  "2026-10-01": [
    { title: "Yaşlılar Haftası", time: "09:00", location: "Groß-Gerau", description: "Gemeinsames Programm für die ältere Generation." },
    { title: "GG KT Anne Çocuk oyun halkası", time: "15:00", location: "Gemeindezentrum", description: "Spiel- und Bewegungsaktivität für Kinder und Familien." },
    { title: "Ev Sohbetleri Aksiyonu Başlangıcı", time: "18:30", location: "Hauskreis", description: "Beginn der Gesprächs- und Austauschrunde zu Hause." }
  ],
  "2026-10-02": [
    { title: "KGT ŞYK Toplantı + Sohbet", time: "19:00", location: "Groß-Gerau", description: "Teamtreffen mit Gesprächsrunde." }
  ],
  "2026-10-03": [
    { title: "TOM (Açık Cami Günü)", time: "10:00", location: "Moschee", description: "Offener Tag mit kurzer Präsentation." },
    { title: "GG KT ŞYK Toplantısı", time: "17:30", location: "Groß-Gerau", description: "Regelmäßiges Treffen des Organisationskreises." }
  ],
  "2026-10-04": [
    { title: "Aile Etkinliği", time: "13:00", location: "Park", description: "Familienprogramm mit Spieleinheiten." }
  ],
  "2026-10-05": [
    { title: "Kütüphane Çalışması", time: "11:00", location: "Bibliothek", description: "Lese- und Lernrunde." }
  ],
  "2026-10-06": [
    { title: "Beyin Fırtınası", time: "18:00", location: "Groß-Gerau", description: "Ideenrunde und Projektplanung." }
  ],
  "2026-10-07": [
    { title: "Sohbet Günü", time: "17:00", location: "Gemeindezentrum", description: "Tagesgespräch und Austausch." }
  ],
  "2026-11-01": [
    { title: "Bölge 2. GŞBT", time: "09:30", location: "Regional", description: "Regionale Sitzung." },
    { title: "GG KT ŞYK Toplantısı", time: "17:00", location: "Groß-Gerau", description: "Organisationstreffen." },
    { title: "Bölge AT EMMT", time: "11:00", location: "Regional", description: "Regionale Zusammenarbeit." },
    { title: "GG KT Aile Eğitim Semineri", time: "18:00", location: "Gemeindezentrum", description: "Seminar zum Thema Familie und Bildung." }
  ],
  "2026-11-03": [
    { title: "GG KT YEK", time: "10:00", location: "Groß-Gerau", description: "Jährliche Regionalkonferenz." }
  ],
  "2026-11-04": [
    { title: "İmam Hatipler Toplantısı", time: "19:00", location: "Groß-Gerau", description: "Treffen mit Geistlichen und Kooperationspartnern." }
  ],
  "2026-11-05": [
    { title: "GG KT Anne Çocuk oyun halkası", time: "15:00", location: "Gemeindezentrum", description: "Programm für Familien und Kinder." }
  ],
  "2026-11-06": [
    { title: "KGT Toplantı", time: "18:30", location: "Groß-Gerau", description: "Treffen der Arbeitsgruppe." }
  ],
  "2026-12-01": [
    { title: "GG KT YEK", time: "10:00", location: "Groß-Gerau", description: "Jährliche Versammlung." }
  ],
  "2026-12-02": [
    { title: "İmam Hatipler Toplantısı", time: "19:00", location: "Groß-Gerau", description: "Austausch mit Verantwortlichen." }
  ],
  "2026-12-03": [
    { title: "Dünya Engelliler Günü", time: "09:00", location: "Groß-Gerau", description: "Aktions- und Sensibilisierungstag." },
    { title: "GG KT Anne Çocuk oyun halkası", time: "15:00", location: "Gemeindezentrum", description: "Familienprogramm für Kinder und Mütter." }
  ],
  "2026-12-04": [
    { title: "KGT ŞYK Toplantı + Sohbet", time: "18:30", location: "Groß-Gerau", description: "Gespräch und Planung." }
  ],
  "2026-12-05": [
    { title: "Toplumsal Etkinlik", time: "17:00", location: "Groß-Gerau", description: "Gemeinsames gesellschaftliches Ereignis." }
  ],
  "2026-12-06": [
    { title: "Açık Sohbet", time: "18:00", location: "Gemeindezentrum", description: "Offener Austausch mit der Gemeinschaft." }
  ],
  "2026-12-08": [
    { title: "Aile Buluşması", time: "13:00", location: "Groß-Gerau", description: "Familien- und Begegnungsprogramm." }
  ]
};

const EVENT_KEY = "kg_calendar_events";
let calMonth = 9;
let calYear = 2026;

const getCustomEvents = () => {
  try {
    const events = JSON.parse(localStorage.getItem(EVENT_KEY) || "[]");
    return Array.isArray(events) ? events : [];
  } catch {
    return [];
  }
};

const saveCustomEvents = (events) => {
  localStorage.setItem(EVENT_KEY, JSON.stringify(events));
};

const getCalendarEvents = () => {
  const customEvents = getCustomEvents();
  const merged = {};

  Object.entries(CAL).forEach(([date, list]) => {
    merged[date] = [...list];
  });

  customEvents.forEach(item => {
    if (!item.date) return;
    const list = merged[item.date] || [];
    list.push({
      id: item.id,
      title: item.title,
      time: item.time || "",
      location: item.location || "",
      description: item.description || "",
      custom: true
    });
    merged[item.date] = list;
  });

  return merged;
};

function renderCalendar() {
  const names = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const firstDay = new Date(calYear, calMonth, 1).getDay() || 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const eventsByDate = getCalendarEvents();

  let html = "";

  names.forEach(name => {
    html += `<div class="cal-day-name">${name}</div>`;
  });

  for (let i = 1; i < firstDay; i++) {
    html += `<div class="cal-empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = eventsByDate[dateStr] || [];
    const preview = dayEvents.slice(0, 2);

    const eventMarkup = preview.length
      ? `<div class="cal-event-stack">${preview.map(item => `<span class="cal-badge">${String(item.title).slice(0, 26)}</span>`).join("")}${dayEvents.length > 2 ? `<span class="cal-more">+${dayEvents.length - 2}</span>` : ""}</div>`
      : "";

    html += `<button type="button" class="cal-day${dayEvents.length ? " has-event" : ""}" data-date="${dateStr}"><span class="cal-day-number">${day}</span>${eventMarkup}</button>`;
  }

  const calendar = document.getElementById("calendar");
  if (calendar) {
    calendar.innerHTML = html;
    calendar.querySelectorAll(".cal-day").forEach(button => {
      button.onclick = () => openDay(button.dataset.date);
    });
  }

  const calTitle = document.getElementById("calTitle");
  if (calTitle) {
    calTitle.textContent = `${months[calMonth]} ${calYear}`;
  }
}

function esc(value) {
  return String(value || "").replace(/[&<>\'\"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  }[char]));
}

function openEventEditor(dateKey, eventId = "") {
  const form = document.getElementById("eventForm");
  const modal = document.getElementById("eventModal");
  const titleEl = document.getElementById("eventModalTitle");
  const hiddenId = document.getElementById("eventId");

  if (!form || !modal || !titleEl || !hiddenId) return;

  hiddenId.value = eventId || "";

  if (eventId) {
    const item = getCustomEvents().find(entry => String(entry.id) === String(eventId));
    if (item) {
      document.getElementById("eTitle").value = item.title || "";
      document.getElementById("eDate").value = item.date || dateKey;
      document.getElementById("eTime").value = item.time || "";
      document.getElementById("eLocation").value = item.location || "";
      document.getElementById("eDescription").value = item.description || "";
      titleEl.textContent = "Termin bearbeiten";
    }
  } else {
    form.reset();
    document.getElementById("eDate").value = dateKey || "";
    titleEl.textContent = "Neuen Termin hinzufügen";
  }

  modal.classList.remove("hidden");
}

function openDay(key) {
  const ev = getCalendarEvents()[key] || [];
  const d = new Date(`${key}T12:00:00`);
  const modal = document.getElementById("dayModal");
  const title = document.getElementById("dayTitle");
  const list = document.getElementById("dayEvents");

  if (title) {
    title.textContent = new Intl.DateTimeFormat("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(d);
  }

  if (list) {
    if (ev.length) {
      list.innerHTML = ev.map(item => {
        const isCustom = !!item.custom || item.id;
        const eventId = item.id ? String(item.id) : "";
        return `
          <article class="event-item ${isCustom ? "event-item-custom" : ""}" data-event-id="${eventId}" data-date="${key}" tabindex="0" role="button">
            <div class="event-item-header">
              <h3>${esc(item.title)}</h3>
              ${isCustom ? `<button type="button" class="event-edit-btn" data-edit-id="${eventId}" data-date="${key}">Bearbeiten</button>` : ""}
            </div>
            <div class="event-meta">
              ${item.time ? `<span>🕒 ${esc(item.time)}</span>` : ""}
              ${item.location ? `<span>📍 ${esc(item.location)}</span>` : ""}
            </div>
            ${item.description ? `<p>${esc(item.description)}</p>` : ""}
          </article>
        `;
      }).join("");

      list.querySelectorAll(".event-item-custom").forEach(article => {
        article.onclick = event => {
          if (event.target.closest(".event-edit-btn")) return;
          const id = article.dataset.eventId;
          if (id) {
            openEventEditor(article.dataset.date, id);
          }
        };
      });

      list.querySelectorAll(".event-edit-btn").forEach(button => {
        button.onclick = event => {
          event.stopPropagation();
          openEventEditor(button.dataset.date, button.dataset.editId);
        };
      });
    } else {
      list.innerHTML = "<p>Heute kein Termin.</p>";
    }
  }

  if (modal) {
    modal.classList.remove("hidden");
  }
}

document.getElementById("prevMonth").onclick = () => {
  calMonth--;
  if (calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  calMonth++;
  if (calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  renderCalendar();
};

const KEY = { a: "kg_activities", n: "kg_notices", g: "kg_gallery" };
const DATA_PATHS = {
  a: "./data/activities.json",
  n: "./data/notices.json",
  g: "./data/gallery.json"
};
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const get = k => JSON.parse(localStorage.getItem(k) || "[]");

function set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("localStorage save failed:", error);
    if (error && error.name === "QuotaExceededError") {
      window.alert("Speicher voll. Bitte nur wenige oder keine Bilddaten speichern. Nutze eine Bild-URL oder eine Cloud-Lösung.");
    }
    return false;
  }
}

function normalizeImageUrl(value) {
  if (!value) return "";
  const text = String(value).trim();
  if (!text) return "";

  try {
    const url = new URL(text);
    return url.href;
  } catch {
    return "";
  }
}

async function loadRemoteData(key) {
  const path = DATA_PATHS[key];
  if (!path) return [];

  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.warn(`Falling back to localStorage for ${key}:`, error);
    return get(KEY[key]);
  }
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menu").onclick = () => {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
};

$$("nav a").forEach(a => {
  a.onclick = () => {
    const nav = document.getElementById("nav");
    if (nav) nav.classList.remove("open");
  };
});

$$(".admin-open").forEach(button => {
  button.onclick = () => {
    const modal = document.getElementById(button.dataset.modal);
    if (modal) modal.classList.remove("hidden");
  };
});

$$(".modal").forEach(modal => {
  modal.onclick = e => {
    if (e.target === modal) modal.classList.add("hidden");
  };

  const closeButton = modal.querySelector(".close");
  if (closeButton) {
    closeButton.onclick = () => modal.classList.add("hidden");
  }
});

const date = s => s ? new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
  year: "numeric"
}).format(new Date(s + "T12:00:00")) : "";

function renderActivities(items = get(KEY.a)) {
  const grid = $("#activityGrid");
  const empty = $("#activityEmpty");

  if (grid) grid.innerHTML = "";
  if (empty) empty.style.display = items.length ? "none" : "block";

  items.forEach(x => {
    const article = document.createElement("article");
    article.className = "card";

    const imageHtml = x.images && x.images[0]
      ? `<img class="card-img" src="${esc(x.images[0])}" alt="">`
      : `<div class="card-img"></div>`;

    article.innerHTML = `
      ${imageHtml}
      <div class="card-body">
        <small>${esc(date(x.date))}</small>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.text || "")}</p>
        <div class="card-meta">
          ${x.date ? `<span>📅 ${esc(date(x.date))}</span>` : ""}
        </div>
        <div class="activity-card-actions">
          <button class="delete" type="button" data-id="${x.id}">Löschen</button>
        </div>
      </div>
    `;

    const delBtn = article.querySelector(".delete");
    if (delBtn) {
      delBtn.onclick = () => {
        const next = get(KEY.a).filter(item => item.id !== x.id);
        set(KEY.a, next);
        renderAll();
      };
    }

    if (grid) grid.appendChild(article);
  });
}

function renderNotices(items = get(KEY.n)) {
  const list = $("#noticeList");
  const empty = $("#noticeEmpty");

  if (list) list.innerHTML = "";
  if (empty) empty.style.display = items.length ? "none" : "block";

  items.forEach(x => {
    const notice = document.createElement("article");
    notice.className = "notice";
    notice.innerHTML = `
      <small>${esc(date(x.date))}</small>
      <h3>${esc(x.title)}</h3>
      <p>${esc(x.text)}</p>
      <button class="delete" type="button" data-id="${x.id}">Sil</button>
    `;

    const btn = notice.querySelector(".delete");
    if (btn) {
      btn.onclick = () => {
        const notices = get(KEY.n).filter(item => item.id !== x.id);
        set(KEY.n, notices);
        renderAll();
      };
    }

    if (list) list.appendChild(notice);
  });
}

function renderGallery(items = get(KEY.g)) {
  const gallery = $("#gallery");
  const empty = $("#galleryEmpty");

  if (gallery) gallery.innerHTML = "";
  if (empty) empty.style.display = items.length ? "none" : "block";

  items.forEach(item => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${esc(item.src)}" alt="Aktivite fotoğrafı">
      <button type="button">×</button>
    `;

    const btn = figure.querySelector("button");
    if (btn) {
      btn.onclick = () => {
        const photos = get(KEY.g).filter(x => x.id !== item.id);
        set(KEY.g, photos);
        renderAll();
      };
    }

    if (gallery) gallery.appendChild(figure);
  });
}

document.getElementById("activityForm").onsubmit = async e => {
  e.preventDefault();

  const title = document.getElementById("aTitle").value.trim();
  const dateValue = document.getElementById("aDate").value;
  const text = document.getElementById("aText").value.trim();

  const filesInput = document.getElementById("aImages");
  const images = [];

  if (!title || !dateValue) {
    window.alert("Bitte Titel und Datum eingeben.");
    return;
  }

  if (filesInput && filesInput.files.length > 0) {
    for (let file of filesInput.files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        images.push(event.target.result);
        if (images.length === filesInput.files.length) {
          saveActivity(title, dateValue, text, images);
        }
      };
      reader.readAsDataURL(file);
    }
  } else {
    saveActivity(title, dateValue, text, images);
  }

  function saveActivity(title, dateValue, text, images) {
    const item = {
      id: Date.now(),
      title,
      date: dateValue,
      text,
      images: images
    };

    const current = get(KEY.a);
    const next = [...current, item];

    if (!set(KEY.a, next)) {
      return;
    }

    e.target.reset();
    document.getElementById("activityModal").classList.add("hidden");
    renderAll();
  }
};

document.getElementById("noticeForm").onsubmit = e => {
  e.preventDefault();

  const title = document.getElementById("nTitle").value.trim();
  const text = document.getElementById("nText").value.trim();

  if (!title || !text) return;

  const current = get(KEY.n);
  const next = [...current, {
    id: Date.now(),
    title,
    text,
    date: new Date().toISOString().slice(0, 10)
  }];

  set(KEY.n, next);
  e.target.reset();
  document.getElementById("noticeModal").classList.add("hidden");
  renderAll();
};

document.getElementById("eventForm").onsubmit = e => {
  e.preventDefault();

  const title = document.getElementById("eTitle").value.trim();
  const dateValue = document.getElementById("eDate").value;
  const time = document.getElementById("eTime").value.trim();
  const location = document.getElementById("eLocation").value.trim();
  const description = document.getElementById("eDescription").value.trim();
  const eventId = document.getElementById("eventId").value;

  if (!title || !dateValue) return;

  const customEvents = getCustomEvents();

  if (eventId) {
    const updated = customEvents.map(item => String(item.id) === String(eventId)
      ? { ...item, title, date: dateValue, time, location, description }
      : item
    );
    saveCustomEvents(updated);
  } else {
    const next = [...customEvents, {
      id: Date.now(),
      title,
      date: dateValue,
      time,
      location,
      description
    }];
    saveCustomEvents(next);
  }

  e.target.reset();
  document.getElementById("eventId").value = "";
  document.getElementById("eventModalTitle").textContent = "Neuen Termin hinzufügen";
  renderCalendar();
  openDay(dateValue);
  document.getElementById("eventModal").classList.add("hidden");
};

document.getElementById("galleryForm").onsubmit = async e => {
  e.preventDefault();

  const filesInput = document.getElementById("gImages");

  if (!filesInput || filesInput.files.length === 0) {
    window.alert("Bitte mindestens ein Bild auswählen.");
    return;
  }

  const images = [];

  for (let file of filesInput.files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      images.push(event.target.result);
      if (images.length === filesInput.files.length) {
        saveGallery(images);
      }
    };
    reader.readAsDataURL(file);
  }

  function saveGallery(images) {
    const current = get(KEY.g);
    const next = [...current, ...images.map(src => ({
      id: Date.now() + Math.random(),
      src: src
    }))];

    if (!set(KEY.g, next)) {
      return;
    }

    e.target.reset();
    document.getElementById("galleryModal").classList.add("hidden");
    renderAll();
  }
};

async function renderAll() {
  const [activities, notices, gallery] = await Promise.all([
    loadRemoteData("a"),
    loadRemoteData("n"),
    loadRemoteData("g")
  ]);

  renderActivities(activities);
  renderNotices(notices);
  renderGallery(gallery);
  renderCalendar();
}

renderAll();
