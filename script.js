const currentDate = new Date();
const calendarEl = document.getElementById('calendar');
const calTitle = document.getElementById('calTitle');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const yearEl = document.getElementById('year');

const events = {
  '2026-10-05': ['10:00 - Kadınlar Buluşması', '14:00 - El işi atölyesi'],
  '2026-10-12': ['18:30 - Okuma ve sohbet'],
  '2026-10-19': ['11:00 - Aile günü'],
  '2026-10-27': ['17:00 - Eğitim semineri'],
  '2026-11-02': ['09:30 - Kahvaltı toplantısı'],
  '2026-11-15': ['15:00 - Çocuk etkinliği'],
  '2026-11-20': ['19:00 - Film gecesi'],
  '2026-12-04': ['12:00 - Yılbaşı hazırlığı']
};

function formatMonthLabel(date) {
  return new Intl.DateTimeFormat('tr-TR', {
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function renderCalendar() {
  if (!calendarEl || !calTitle) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  calTitle.textContent = formatMonthLabel(currentDate);
  calendarEl.innerHTML = '';

  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  weekDays.forEach((day) => {
    const header = document.createElement('div');
    header.className = 'cal-header';
    header.textContent = day;
    calendarEl.appendChild(header);
  });

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startOffset; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cal-empty';
    calendarEl.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayCell = document.createElement('button');
    dayCell.type = 'button';
    dayCell.className = 'cal-day';
    dayCell.textContent = day;

    if (events[dateKey]) {
      dayCell.classList.add('has-events');
      dayCell.setAttribute('aria-label', `${day}. gün etkinlikler var`);
    }

    dayCell.addEventListener('click', () => openDayModal(dateKey));
    calendarEl.appendChild(dayCell);
  }
}

function openDayModal(dateKey) {
  const modal = document.getElementById('dayModal');
  const title = document.getElementById('dayTitle');
  const content = document.getElementById('dayEvents');

  if (!modal || !title || !content) return;

  const [year, month, day] = dateKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  title.textContent = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'full'
  }).format(date);

  content.innerHTML = '';

  const list = events[dateKey];

  if (!list || list.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Bu gün için program yok.';
    content.appendChild(empty);
  } else {
    list.forEach((entry) => {
      const item = document.createElement('div');
      item.className = 'event-item';
      item.textContent = entry;
      content.appendChild(item);
    });
  }

  modal.classList.remove('hidden');
}

function closeModal() {
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.classList.add('hidden');
  });
}

if (prevMonthBtn) {
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
}

if (nextMonthBtn) {
  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
}

document.querySelectorAll('.close').forEach((button) => {
  button.addEventListener('click', closeModal);
});

document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

renderCalendar();
