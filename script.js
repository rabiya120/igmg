const CAL = {
  "2026-10-01": ["Yaşlılar Haftası", "GG KT Anne Çocuk oyun halkası", "Ev Sohbetleri Aksiyonu Başlangıcı"],
  "2026-10-02": ["KGT ŞYK Toplantı + Sohbet"],
  "2026-10-03": ["TOM (Açık Cami Günü)", "GG KT ŞYK Toplantısı"],
  "2026-10-04": ["Aile Etkinliği"],
  "2026-10-05": ["Kütüphane Çalışması"],
  "2026-10-06": ["Beyin Fırtınası"],
  "2026-10-07": ["Sohbet Günü"],
  "2026-11-01": ["Bölge 2. GŞBT", "GG KT ŞYK Toplantısı", "Bölge AT EMMT", "GG KT Aile Eğitim Semineri"],
  "2026-11-03": ["GG KT YEK"],
  "2026-11-04": ["İmam Hatipler Toplantısı"],
  "2026-11-05": ["GG KT Anne Çocuk oyun halkası"],
  "2026-11-06": ["KGT Toplantı"],
  "2026-12-01": ["GG KT YEK"],
  "2026-12-02": ["İmam Hatipler Toplantısı"],
  "2026-12-03": ["Dünya Engelliler Günü", "GG KT Anne Çocuk oyun halkası"],
  "2026-12-04": ["KGT ŞYK Toplantı + Sohbet"],
  "2026-12-05": ["Toplumsal Etkinlik"],
  "2026-12-06": ["Açık Sohbet"],
  "2026-12-08": ["Aile Buluşması"]
};

let calMonth = 9;
let calYear = 2026;

function renderCalendar() {
  const names = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const firstDay = new Date(calYear, calMonth, 1).getDay() || 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  let html = "";

  names.forEach(name => {
    html += `<div class="cal-day-name">${name}</div>`;
  });

  for (let i = 1; i < firstDay; i++) {
    html += `<div class="cal-empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const hasEvent = CAL[dateStr] ? " has-event" : "";
    html += `<button type="button" class="cal-day${hasEvent}" data-date="${dateStr}">${day}</button>`;
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

function openDay(key) {
  const ev = CAL[key] || [];
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
      list.innerHTML = ev.map(item => `<div class="event-item">${item}</div>`).join("");
    } else {
      list.innerHTML = "<p>Bu gün program yok.</p>";
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
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const get = k => JSON.parse(localStorage.getItem(k) || "[]");
const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

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

const esc = s => String(s || "").replace(/[&<>"']/g, c => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
}[c]));

const date = s => s ? new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
  year: "numeric"
}).format(new Date(s + "T12:00:00")) : "";

function renderActivities() {
  const a = get(KEY.a).sort((x, y) => (y.date || "").localeCompare(x.date || ""));
  const grid = $("#activityGrid");
  const empty = $("#activityEmpty");

  if (grid) grid.innerHTML = "";
  if (empty) empty.style.display = a.length ? "none" : "block";

  a.forEach(x => {
    const article = document.createElement("article");
    article.className = "card";

    article.innerHTML = `
      ${x.images && x.images[0] ? `<img class="card-img" src="${x.images[0]}" alt="">` : `<div class="card-img"></div>`}
      <div class="card-body">
        <small>${esc(date(x.date))}</small>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.text || "")}</p>
      </div>
    `;

    if (grid) grid.appendChild(article);
  });
}

function renderNotices() {
  const n = get(KEY.n).sort((x, y) => y.id - x.id);
  const list = $("#noticeList");
  const empty = $("#noticeEmpty");

  if (list) list.innerHTML = "";
  if (empty) empty.style.display = n.length ? "none" : "block";

  n.forEach(x => {
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

function renderGallery() {
  const g = get(KEY.g);
  const gallery = $("#gallery");
  const empty = $("#galleryEmpty");

  if (gallery) gallery.innerHTML = "";
  if (empty) empty.style.display = g.length ? "none" : "block";

  g.forEach(item => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${item.src}" alt="Aktivite fotoğrafı">
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

function filesToData(files) {
  return Promise.all([...files].map(file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  ));
}

document.getElementById("activityForm").onsubmit = async e => {
  e.preventDefault();

  const title = document.getElementById("aTitle").value.trim();
  const dateValue = document.getElementById("aDate").value;
  const text = document.getElementById("aText").value.trim();
  const files = document.getElementById("aImages").files;

  let images = [];
  if (files && files.length) {
    images = await filesToData(files);
  }

  const item = {
    id: Date.now(),
    title,
    date: dateValue,
    text,
    images
  };

  const current = get(KEY.a);
  current.push(item);
  set(KEY.a, current);

  e.target.reset();
  renderAll();
};

document.getElementById("noticeForm").onsubmit = e => {
  e.preventDefault();

  const title = document.getElementById("nTitle").value.trim();
  const text = document.getElementById("nText").value.trim();

  if (!title || !text) return;

  const current = get(KEY.n);
  current.push({
    id: Date.now(),
    title,
    text,
    date: new Date().toISOString().slice(0, 10)
  });

  set(KEY.n, current);
  e.target.reset();
  renderAll();
};

document.getElementById("galleryForm").onsubmit = async e => {
  e.preventDefault();

  const files = document.getElementById("gImages").files;
  if (!files || !files.length) return;

  const current = get(KEY.g);
  const images = await filesToData(files);

  images.forEach(src => {
    current.push({
      id: Date.now() + Math.random(),
      src
    });
  });

  set(KEY.g, current);
  e.target.reset();
  renderAll();
};

function renderAll() {
  renderActivities();
  renderNotices();
  renderGallery();
}

renderAll();
renderCalendar();
