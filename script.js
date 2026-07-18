// ============================
// PAGE PROTECTION (runs on home.html)
// ============================

if (window.location.pathname.includes("home.html")) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "index.html";
  }
}

// ============================
// LOGIN LOGIC (runs on index.html)
// ============================

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

function getExpectedPassword(id) {
  const upperID = id.toUpperCase();

  const regularMatch = upperID.match(/^24BM(\d{3})$/);
  if (regularMatch) {
    const rollNumber = parseInt(regularMatch[1], 10);
    if (rollNumber >= 1 && rollNumber <= 76) {
      const lastTwoDigits = regularMatch[1].slice(-2);
      return lastTwoDigits + "BME";
    }
  }

  const lateralMatch = upperID.match(/^25BML(\d{2})$/);
  if (lateralMatch) {
    const rollNumber = parseInt(lateralMatch[1], 10);
    if (rollNumber >= 1 && rollNumber <= 4) {
      return lateralMatch[1] + "BME";
    }
  }

  return null;
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredID = document.getElementById("student-id").value.trim();
    const enteredPassword = document.getElementById("password").value.trim();

    const expectedPassword = getExpectedPassword(enteredID);

    if (expectedPassword && enteredPassword.toUpperCase() === expectedPassword) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("studentID", enteredID.toUpperCase());
      window.location.href = "home.html";
    } else {
      errorMessage.style.display = "block";
    }
  });
}

// ============================
// LOGOUT LOGIC (runs on home.html)
// ============================

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("studentID");
    window.location.href = "index.html";
  });
}

// ============================
// PERSONALIZED WELCOME (runs on home.html)
// ============================

const welcomeText = document.getElementById("welcome-text");

if (welcomeText) {
  const studentID = localStorage.getItem("studentID");
  welcomeText.textContent = "Student ID: " + studentID;
}

// ============================
// FORGOT PASSWORD (runs on index.html)
// ============================

const forgotLink = document.getElementById("forgot-link");

if (forgotLink) {
  forgotLink.addEventListener("click", function (event) {
    event.preventDefault();
    alert("To reset your password, please contact your class teacher or the admin office.");
  });
}

// ============================
// WEEKLY TIMETABLE (runs on home.html)
// ============================

const periodTimes = [
  "08:55 – 09:50 AM",
  "09:50 – 10:45 AM",
  "11:05 – 12:00 PM",
  "12:00 – 12:55 PM",
  "01:45 – 02:35 PM",
  "02:35 – 03:25 PM",
  "03:25 – 04:15 PM"
];

const timetableData = {
  Monday: [
    { code: "U21BM501", subject: "Microcontroller and its Applications", faculty: "Dr. A. Allwyn Gnanadas" },
    { code: "U21BM505", subject: "Biocontrol Systems", faculty: "Dr. N. Rajasingam" },
    { code: "U21BMP06 / U21BMP25", subject: "Bioprinting / Internet of Medical Things", faculty: "Dr. T. Gayathri / Dr. K.S. Tamilselvan" },
    { code: "MH", subject: "Mentor Hour", faculty: "Mentors" },
    { code: "OE", subject: "Open Elective" },
    { code: "TS", subject: "Technical Seminar", faculty: "Ms. R. Monisha" },
    { code: "PT", subject: "Placement Training", faculty: "Ms. M. Nivethitha" }
  ],
  Tuesday: [
    { code: "U21BMP11 / U21BMP14", subject: "QMAH / Healthcare Data Analytics", faculty: "Dr. D. Sudarvizhi / Dr. P. Arunkumar" },
    { code: "U21BM504", subject: "Microcontroller Laboratory", faculty: "Dr. N. Rajasingam / Mr. R. Krishnakumar / Ms. M. Nivethitha" },
    { code: "U21BM504", subject: "Microcontroller Laboratory", faculty: "Dr. N. Rajasingam / Mr. R. Krishnakumar / Ms. M. Nivethitha" },
    { code: "U21BM504", subject: "Microcontroller Laboratory", faculty: "Dr. N. Rajasingam / Mr. R. Krishnakumar / Ms. M. Nivethitha" },
    { code: "GATE", subject: "GATE Aptitude Test in Engineering", faculty: "Dr. K. Janagi / Ms. M. Nivethitha / Ms. S. Abibharathi" },
    { code: "U21BM502", subject: "Biosignal Processing", faculty: "Dr. Ragupathy / Ms. R. Monisha" },
    { code: "U21BMP10", subject: "Medical Device Design", faculty: "Dr. N. Rajasingam" }
  ],
  Wednesday: [
    { code: "U21BM505", subject: "Biocontrol Systems", faculty: "Dr. N. Rajasingam" },
    { code: "U21BM502", subject: "Biosignal Processing", faculty: "Dr. Ragupathy / Ms. R. Monisha" },
    { code: "U21BM501", subject: "Microcontroller and its Applications", faculty: "Dr. A. Allwyn Gnanadas" },
    { code: "U21BMP06 / U21BMP25", subject: "Bioprinting / Internet of Medical Things", faculty: "Dr. T. Gayathri / Dr. K.S. Tamilselvan" },
    { code: "OE", subject: "Open Elective" },
    { code: "U21BMP11 / U21BMP14", subject: "QMAH / Healthcare Data Analytics", faculty: "Dr. D. Sudarvizhi / Dr. P. Arunkumar" },
    { code: "GATE", subject: "GATE Aptitude Test in Engineering", faculty: "Dr. K. Janagi / Ms. M. Nivethitha / Ms. S. Abibharathi" }
  ],
  Thursday: [
    { code: "U21BM502", subject: "Biosignal Processing", faculty: "Dr. Ragupathy / Ms. R. Monisha" },
    { code: "U21BMP11 / U21BMP14", subject: "QMAH / Healthcare Data Analytics", faculty: "Dr. D. Sudarvizhi / Dr. P. Arunkumar" },
    { code: "U21BM505", subject: "Biocontrol Systems", faculty: "Dr. N. Rajasingam" },
    { code: "TS", subject: "Technical Seminar", faculty: "Ms. R. Monisha" },
    { code: "U21BMP10", subject: "Medical Device Design", faculty: "Dr. N. Rajasingam" },
    { code: "U21BM502", subject: "Biosignal Processing", faculty: "Dr. Ragupathy / Ms. R. Monisha" },
    { code: "U21BM502", subject: "Biosignal Processing", faculty: "Dr. Ragupathy / Ms. R. Monisha" }
  ],
  Friday: [
   { code: "PT", subject: "Placement Training", faculty: "Mr. R. Yoganathan / Ms. M. Nivethitha" },
    { code: "U21BMP10", subject: "Medical Device Design", faculty: "Dr. N. Rajasingam" },
    { code: "U21BM501", subject: "Microcontroller and its Applications", faculty: "Dr. A. Allwyn Gnanadas" },
    { code: "U21BMP06 / U21BMP25", subject: "Bioprinting / Internet of Medical Things", faculty: "Dr. T. Gayathri / Dr. K.S. Tamilselvan" },
    { code: "OE", subject: "Open Elective"},
    { code: "GATE", subject: "GATE Aptitude Test in Engineering", faculty: "Dr. K. Janagi / Ms. M. Nivethitha / Ms. S. Abibharathi" },
    { code: "LH", subject: "Library Hour", faculty: "Dr. P. Arunkumar" }
  ],
  Saturday: [
  { code: "U21BM505", subject: "Biocontrol Systems", faculty: "Dr. N. Rajasingam" },
  { code: "U21BM501", subject: "Microcontroller and its Applications", faculty: "Dr. A. Allwyn Gnanadas" },
  { code: "U21BMP06 / U21BMP25", subject: "Bioprinting / Internet of Medical Things", faculty: "Dr. T. Gayathri / Dr. K.S. Tamilselvan" },
  { code: "U21BMP11 / U21BMP14", subject: "QMAH / Healthcare Data Analytics", faculty: "Dr. D. Sudarvizhi / Dr. P. Arunkumar" },
  { code: "-", subject: "Activity", faculty: "-" },
  { code: "-", subject: "Activity", faculty: "-" },
  { code: "-", subject: "Activity", faculty: "-" }
],
};

const timetableContainer = document.getElementById("timetable-container");
const dayButtons = document.querySelectorAll(".day-btn");

function renderTimetable(day) {
  timetableContainer.innerHTML = "";
  const periods = timetableData[day];

  periods.forEach(function (period, index) {
    const li = document.createElement("li");
    li.innerHTML =
      '<span class="class-name">P' + (index + 1) + ' — ' + period.code +
      '<br><span class="subject-line">' + period.subject + '</span>' +
      '<br><span class="faculty-line">' + period.faculty + '</span></span>' +
      '<span class="class-time">' + periodTimes[index] + '</span>';
    timetableContainer.appendChild(li);
  });
}

if (dayButtons.length > 0) {
  dayButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      dayButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      renderTimetable(btn.dataset.day);
    });
  });

  document.querySelector('[data-day="Monday"]').classList.add("active");
  renderTimetable("Monday");
}

// ============================
// ACADEMIC CALENDAR (runs on calendar.html)
// ============================

const academicEvents = [
  { start: "2026-06-25", end: "2026-07-01", title: "Course Registration", type: "event" },
  { start: "2026-07-01", end: "2026-07-01", title: "Commencement of Classes", type: "event" },
  { start: "2026-07-06", end: "2026-07-10", title: "Placement Training Slot 1", type: "meeting" },
  { start: "2026-07-11", end: "2026-07-11", title: "Holiday", type: "holiday" },
  { start: "2026-07-16", end: "2026-07-18", title: "Project Review - Phase 1", type: "meeting" },
  { start: "2026-07-20", end: "2026-07-24", title: "Placement Training Slot 2", type: "meeting" },
  { start: "2026-07-25", end: "2026-07-25", title: "Holiday", type: "holiday" },
  { start: "2026-08-03", end: "2026-08-03", title: "Adi Perukku", type: "holiday" },
  { start: "2026-08-04", end: "2026-08-07", title: "Placement Training Slot 3", type: "meeting" },
  { start: "2026-08-08", end: "2026-08-08", title: "Holiday", type: "holiday" },
  { start: "2026-08-10", end: "2026-08-14", title: "Course Coordinators Meeting", type: "meeting" },
  { start: "2026-08-15", end: "2026-08-15", title: "Independence Day", type: "holiday" },
  { start: "2026-08-24", end: "2026-08-31", title: "CIAT - I (2.5 Units, 60 Marks)", type: "exam" },
  { start: "2026-08-26", end: "2026-08-26", title: "Milad-un-Nabi", type: "holiday" },
  { start: "2026-09-01", end: "2026-09-05", title: "Block Teaching", type: "event" },
  { start: "2026-09-04", end: "2026-09-04", title: "Krishna Jayanthi", type: "holiday" },
  { start: "2026-09-05", end: "2026-09-08", title: "Project Review - Phase 2", type: "meeting" },
  { start: "2026-09-07", end: "2026-09-11", title: "Placement Training Slot 4 / IQAC Audit 1", type: "meeting" },
  { start: "2026-09-12", end: "2026-09-12", title: "Holiday", type: "holiday" },
  { start: "2026-09-14", end: "2026-09-14", title: "Vinayakar Chathurthi", type: "holiday" },
  { start: "2026-09-21", end: "2026-09-25", title: "Placement Training Slot 5", type: "meeting" },
  { start: "2026-09-26", end: "2026-09-26", title: "Holiday", type: "holiday" },
  { start: "2026-10-02", end: "2026-10-02", title: "Gandhi Jayanthi", type: "holiday" },
  { start: "2026-10-05", end: "2026-10-09", title: "Course Coordinators Meeting", type: "meeting" },
  { start: "2026-10-08", end: "2026-10-10", title: "Project Review - Phase 3", type: "meeting" },
  { start: "2026-10-12", end: "2026-10-16", title: "Lab Test", type: "exam" },
  { start: "2026-10-17", end: "2026-10-17", title: "Holiday", type: "holiday" },
  { start: "2026-10-19", end: "2026-10-19", title: "Ayutha Pooja", type: "holiday" },
  { start: "2026-10-20", end: "2026-10-20", title: "Vijaya Dhasami", type: "holiday" },
  { start: "2026-10-22", end: "2026-10-29", title: "CIAT - II (2.5 Units, 60 Marks)", type: "exam" },
{ start: "2026-10-30", end: "2026-11-05", title: "Revision / Optional Test", type: "revision" },  { start: "2026-10-31", end: "2026-10-31", title: "Last Working Day", type: "event" },
  { start: "2026-11-03", end: "2026-11-03", title: "Submission of Attendance - CoE Office", type: "event" },
  { start: "2026-11-07", end: "2026-11-07", title: "Holiday", type: "holiday" },
  { start: "2026-11-08", end: "2026-11-08", title: "Deepavali", type: "holiday" },
  { start: "2026-11-09", end: "2026-11-09", title: "Holiday", type: "holiday" },
  { start: "2026-11-10", end: "2026-11-16", title: "End Semester Practical Exam", type: "exam" },
  { start: "2026-11-12", end: "2026-11-12", title: "Submission of Internal Marks - CoE Office", type: "event" },
  { start: "2026-11-18", end: "2026-11-18", title: "Start of End Semester Theory Exam", type: "exam" },
  { start: "2026-11-18", end: "2026-11-21", title: "IQAC Audit 2", type: "meeting" },
  { start: "2026-11-23", end: "2026-12-19", title: "Odd Semester Vacation", type: "vacation" },
  { start: "2026-11-28", end: "2026-11-28", title: "Holiday", type: "holiday" },
  { start: "2026-12-07", end: "2026-12-26", title: "Internship / In-plant Training / Placement Training", type: "event" },
  { start: "2026-12-12", end: "2026-12-12", title: "Holiday", type: "holiday" },
  { start: "2026-12-25", end: "2026-12-25", title: "Christmas", type: "holiday" },
  { start: "2026-12-26", end: "2026-12-26", title: "Holiday", type: "holiday" },
  { start: "2026-12-28", end: "2026-12-28", title: "Reopening (Sem 4, 6, 8)", type: "event" }
];

let currentMonth = 6;
let currentYear = 2026;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function findEventsForDate(dateStr) {
  return academicEvents.filter(function (ev) {
    return dateStr >= ev.start && dateStr <= ev.end;
  });
}

function formatDateDisplay(dateStr) {
  const parts = dateStr.split("-");
  return parts[2] + "." + parts[1] + "." + parts[0];
}

function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("month-label");
  if (!grid) return;

  monthLabel.textContent = monthNames[currentMonth] + " " + currentYear;
  grid.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach(function (name) {
    const headerCell = document.createElement("div");
    headerCell.className = "cal-day-header";
    headerCell.textContent = name;
    grid.appendChild(headerCell);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.className = "cal-cell empty";
    grid.appendChild(blank);
  }

  for (let day = 1; day <= totalDays; day++) {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = currentYear + "-" + monthStr + "-" + dayStr;

    const events = findEventsForDate(dateStr);

    const cell = document.createElement("div");
    cell.className = "cal-cell";
    if (events.length > 0) {
      const holidayEvent = events.find(function (ev) { return ev.type === "holiday"; });
      const colorType = holidayEvent ? "holiday" : events[0].type;
      cell.classList.add("has-event", colorType);
    }

    cell.innerHTML = '<span class="cal-date-num">' + day + '</span>';

    if (events.length > 0) {
      cell.addEventListener("click", function () {
        const detailsBox = document.getElementById("event-details");
        detailsBox.innerHTML = events.map(function (ev) {
          return '<p><strong>' + formatDateDisplay(dateStr) + ':</strong> ' + ev.title + '</p>';
        }).join("");
      });
    }

    grid.appendChild(cell);
  }
}

const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  nextBtn.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  renderCalendar();
}
