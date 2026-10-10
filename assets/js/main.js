/**
 * GOALPAc — Global O and A Level Preparation Academy
 * Interactive Editorial Engine & Academic Tools
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initGlobalClocks();
  initExamCountdown();
  initRevisionTimetableTool();
  initGradeCalculatorTool();
  initToolsTabSwitch();
  initFaqAccordion();
  initReportSwitcher();
  initMobileDrawer();
  initTrialForm();
  initGsapAnimations();
});

/* --------------------------------------------------------------------------
   1. Sticky Header Behavior
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header-wrapper');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Real-Time Global Institutional Clocks (London, Dubai, Karachi, Dhaka, Singapore)
   -------------------------------------------------------------------------- */
function initGlobalClocks() {
  function updateClocks() {
    const now = new Date();
    
    // Time zones formatters
    const formatTime = (timeZone) => {
      try {
        return new Intl.DateTimeFormat('en-GB', {
          timeZone: timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(now);
      } catch (e) {
        return '--:--';
      }
    };

    const ldn = document.getElementById('tz-london');
    const dxb = document.getElementById('tz-dubai');
    const khi = document.getElementById('tz-karachi');
    const dac = document.getElementById('tz-dhaka');
    const sin = document.getElementById('tz-singapore');

    if (ldn) ldn.textContent = formatTime('Europe/London');
    if (dxb) dxb.textContent = formatTime('Asia/Dubai');
    if (khi) khi.textContent = formatTime('Asia/Karachi');
    if (dac) dac.textContent = formatTime('Asia/Dhaka');
    if (sin) sin.textContent = formatTime('Asia/Singapore');

    // Live Classroom Board (One classroom, six time zones)
    const bDac = document.getElementById('board-tz-dhaka');
    const bDxb = document.getElementById('board-tz-dubai');
    const bLos = document.getElementById('board-tz-lagos');
    const bLdn = document.getElementById('board-tz-london');
    const bKl  = document.getElementById('board-tz-kl');
    const bTor = document.getElementById('board-tz-toronto');

    if (bDac) bDac.textContent = formatTime('Asia/Dhaka');
    if (bDxb) bDxb.textContent = formatTime('Asia/Dubai');
    if (bLos) bLos.textContent = formatTime('Africa/Lagos');
    if (bLdn) bLdn.textContent = formatTime('Europe/London');
    if (bKl)  bKl.textContent  = formatTime('Asia/Kuala_Lumpur');
    if (bTor) bTor.textContent = formatTime('America/Toronto');
  }

  updateClocks();
  setInterval(updateClocks, 30000);
}

/* --------------------------------------------------------------------------
   3. Interactive Tool 1: Live Exam Countdown
   -------------------------------------------------------------------------- */
function initExamCountdown() {
  // Cambridge / Edexcel May/June 2027 series start: May 4, 2027
  const targetDate = new Date('2027-05-04T09:00:00Z').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function tick() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

/* --------------------------------------------------------------------------
   4. Interactive Tool 2: Revision Timetable Generator
   -------------------------------------------------------------------------- */
function initRevisionTimetableTool() {
  const form = document.getElementById('timetable-form');
  const output = document.getElementById('timetable-output');
  if (!form || !output) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const subjectsCount = parseInt(document.getElementById('tt-subjects').value) || 4;
    const weeklyHours = parseInt(document.getElementById('tt-hours').value) || 18;
    const weeksLeft = parseInt(document.getElementById('tt-weeks').value) || 12;
    const board = document.getElementById('tt-board').value;

    const hoursPerSubject = (weeklyHours / subjectsCount).toFixed(1);
    const dailyHours = (weeklyHours / 6).toFixed(1); // 1 rest day per week

    let html = `
      <div style="border-bottom: 2px solid #06264F; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-family: var(--font-serif-editorial); font-size: 1.25rem; color: #06264F; margin: 0;">
          Academic Revision Schedule: ${weeksLeft} Weeks to ${board} Series
        </h4>
        <span style="font-family: var(--font-mono-meta); font-size: 0.76rem; background: #CFA43C; color: #03152c; padding: 4px 10px; font-weight: 700;">
          ${weeklyHours} Hrs/Week · 6 Study Days + 1 Rest Day
        </span>
      </div>
      <p style="font-size: 0.88rem; color: #4A5868; margin-bottom: 20px;">
        Structured under GOALPAc's mark-scheme calibration model. Weaker topics receive double weighting during Phase 1. Final 3 weeks shift exclusively to timed past papers under examiner conditions.
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div class="timetable-week-row">
          <div><strong style="color: #06264F;">Weeks 1 – 4</strong><br><span style="font-size: 0.74rem; color: #728092;">Phase 1: Syllabus Core</span></div>
          <div style="font-size: 0.85rem; color: #121E2C;">Topic diagnostic mastery & note-synthesis. ${hoursPerSubject} hrs/subject per week. Complete unmastered syllabus areas first.</div>
          <div style="text-align: right; font-family: var(--font-mono-meta); font-size: 0.75rem; color: #06264F;"><strong>${dailyHours}h / day</strong></div>
        </div>
        <div class="timetable-week-row">
          <div><strong style="color: #06264F;">Weeks 5 – 8</strong><br><span style="font-size: 0.74rem; color: #728092;">Phase 2: Topical Past Papers</span></div>
          <div style="font-size: 0.85rem; color: #121E2C;">Classification by paper code (e.g. Cambridge Paper 1 MCQs & Paper 2 Structured). Mark with official examiner mark schemes.</div>
          <div style="text-align: right; font-family: var(--font-mono-meta); font-size: 0.75rem; color: #06264F;"><strong>${dailyHours}h / day</strong></div>
        </div>
        <div class="timetable-week-row" style="background: rgba(207, 164, 60, 0.08); border-left: 3px solid #CFA43C;">
          <div><strong style="color: #06264F;">Weeks 9 – ${weeksLeft}</strong><br><span style="font-size: 0.74rem; color: #CFA43C; font-weight: 600;">Phase 3: Full Timed Mocks</span></div>
          <div style="font-size: 0.85rem; color: #121E2C;">Two complete exam series (last 5 years). Strict exam-hall conditions without pausing. Detailed post-mock error logs.</div>
          <div style="text-align: right; font-family: var(--font-mono-meta); font-size: 0.75rem; color: #06264F;"><strong>Peak Sprints</strong></div>
        </div>
      </div>
      <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
        <button type="button" class="btn-academic btn-academic-navy" onclick="alert('Revision timetable plan ready for download as PDF. A mentor consultation has been logged.');" style="padding: 10px 20px; font-size: 0.78rem;">
          <i class="fa-solid fa-file-pdf"></i> Download Official Study Timetable
        </button>
        <span style="font-size: 0.78rem; color: #728092;">Includes weekly habit checklist & subject quota tracker.</span>
      </div>
    `;

    output.innerHTML = html;
    output.style.display = 'block';
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Tool 3: Grade Target Calculator
   -------------------------------------------------------------------------- */
function initGradeCalculatorTool() {
  const form = document.getElementById('grade-calc-form');
  const resultBox = document.getElementById('grade-calc-result');
  if (!form || !resultBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentMark = parseFloat(document.getElementById('gc-current').value) || 52;
    const targetGrade = document.getElementById('gc-target').value;
    const board = document.getElementById('gc-board').value;

    let targetThreshold = 85;
    if (targetGrade === 'A*') targetThreshold = 88;
    else if (targetGrade === 'A') targetThreshold = 76;
    else if (targetGrade === 'B') targetThreshold = 65;

    const delta = (targetThreshold - currentMark).toFixed(1);
    let advice = '';

    if (delta <= 0) {
      advice = `You are currently scoring at or above the typical historical ${targetGrade} boundary. Focus on error elimination and time management under official exam pressure.`;
    } else if (delta <= 15) {
      advice = `A ${delta}% increase is entirely realistic across a single 12-week term. In Cambridge/Edexcel mark schemes, this represents recovering 8–12 marks per structured component through board-specific command-word precision.`;
    } else {
      advice = `A ${delta}% gap requires a structured syllabus reset. GOALPAc's 5-step Grade Plan diagnoses foundational topic gaps first, then builds exam technique to secure the required grade jump.`;
    }

    resultBox.innerHTML = `
      <div style="border-left: 3px solid #CFA43C; padding: 18px; background: rgba(207, 164, 60, 0.05); margin-top: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
          <h4 style="font-family: var(--font-serif-editorial); font-size: 1.25rem; color: #06264F; margin: 0;">
            Target Analysis: Working Grade (${currentMark}%) → Target ${targetGrade} (${targetThreshold}%)
          </h4>
          <span style="font-family: var(--font-mono-meta); font-size: 0.9rem; font-weight: 700; color: ${delta > 0 ? '#CFA43C' : '#27ae60'};">
            ${delta > 0 ? '+' + delta + '% Delta Needed' : 'Boundary Exceeded'}
          </span>
        </div>
        <p style="font-size: 0.88rem; color: #4A5868; line-height: 1.6; margin-bottom: 12px;">${advice}</p>
        <div style="font-family: var(--font-mono-meta); font-size: 0.72rem; color: #728092;">
          * Indicative calculation based on recent ${board} grade thresholds. Actual grade boundaries vary per examination series and are set strictly by the awarding bodies.
        </div>
      </div>
    `;
    resultBox.style.display = 'block';
  });
}

/* --------------------------------------------------------------------------
   6. Tools Tab Switcher
   -------------------------------------------------------------------------- */
function initToolsTabSwitch() {
  const tabs = document.querySelectorAll('.tool-tab-btn');
  const panels = document.querySelectorAll('.tool-tab-content-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   7. Sample Report Subject Switcher
   -------------------------------------------------------------------------- */
function initReportSwitcher() {
  const buttons = document.querySelectorAll('.report-subject-toggle');
  if (!buttons.length) return;

  const reportData = {
    'maths': {
      title: 'Cambridge O Level Mathematics (4024)',
      student: 'Zayd K. · Dubai, UAE',
      month: 'October 2026 Monthly Progress Ledger',
      attendance: '97%',
      quizAvg: '91%',
      paperScore: '86% (Grade A*)',
      covered: '78% Complete (Vectors & Transformations)',
      teacherNote: 'Zayd demonstrated complete clarity on algebraic manipulations and coordinate geometry. Recommended next step: speed drills on non-calculator Paper 1 mental arithmetic under 90-minute limit.',
      mentorNote: 'Self-discipline high. Evening time-zone batch has stabilized study habits.'
    },
    'physics': {
      title: 'Cambridge International AS Physics (9702)',
      student: 'Amina S. · Karachi, Pakistan',
      month: 'October 2026 Monthly Progress Ledger',
      attendance: '100%',
      quizAvg: '88%',
      paperScore: '82% (Grade A)',
      covered: '65% Complete (Waves & Superposition)',
      teacherNote: 'Strong intuitive grasp of Newtonian mechanics. Current focus is Paper 3 practical data analysis and uncertainty evaluation, aligning precisely with Cambridge mark scheme notes.',
      mentorNote: 'Amina has completed 8 timed past papers this month. Grade trajectory is on track for predicted A grade.'
    },
    'chem': {
      title: 'Pearson Edexcel IGCSE Chemistry (4CH1)',
      student: 'Liam T. · London, United Kingdom',
      month: 'October 2026 Monthly Progress Ledger',
      attendance: '95%',
      quizAvg: '85%',
      paperScore: '84% (Grade 9 Equivalent)',
      covered: '72% Complete (Organic Chemistry & Electrolysis)',
      teacherNote: 'Examiner command words: Liam now distinguishes correctly between "describe" and "explain" in industrial chemistry questions, recovering 6 vital marks on fractional distillation questions.',
      mentorNote: 'Parent-teacher conference completed on 14th Oct. Exam registration at local London centre confirmed.'
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.style.background = 'transparent';
        b.style.borderColor = 'var(--paper-border-strong)';
        b.style.color = 'var(--navy-deep)';
      });
      btn.style.background = 'var(--navy-deep)';
      btn.style.color = 'var(--paper-white)';
      btn.style.borderColor = 'var(--navy-deep)';

      const key = btn.getAttribute('data-subject');
      const data = reportData[key];
      if (!data) return;

      document.getElementById('rep-title').textContent = data.title;
      document.getElementById('rep-student').textContent = data.student;
      document.getElementById('rep-month').textContent = data.month;
      document.getElementById('rep-attendance').textContent = data.attendance;
      document.getElementById('rep-quiz').textContent = data.quizAvg;
      document.getElementById('rep-paper').textContent = data.paperScore;
      document.getElementById('rep-teacher-note').textContent = data.teacherNote;
      document.getElementById('rep-mentor-note').textContent = data.mentorNote;
    });
  });
}

/* --------------------------------------------------------------------------
   8. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const openBtn = document.querySelector('.mobile-menu-trigger');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');

  if (!drawer || !backdrop) return;

  const toggle = (open) => {
    if (open) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (openBtn) openBtn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
  backdrop.addEventListener('click', () => toggle(false));

  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });
}

/* --------------------------------------------------------------------------
   10. Free Trial Enrolment Form Submission
   -------------------------------------------------------------------------- */
function initTrialForm() {
  const form = document.getElementById('admissions-trial-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = document.getElementById('adm-name').value;
    const parentEmail = document.getElementById('adm-email').value;
    const board = document.getElementById('adm-board').value;
    const subject = document.getElementById('adm-subject').value;

    // Elegant Academic Modal / Confirmation
    alert(
      `Academic Registration Initiated:\n\n` +
      `Thank you, ${studentName}.\n` +
      `Your complimentary trial class invitation for ${subject} (${board}) has been prepared.\n\n` +
      `A GOALPAc Academic Admissions Advisor will contact ${parentEmail} within 24 hours with class batch timings matching your local time zone.`
    );
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   11. GSAP Scroll Animations
   -------------------------------------------------------------------------- */
function initGsapAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero subtle reveal
  gsap.from('.hero-headline', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.hero-thesis-quote', {
    y: 20,
    opacity: 0,
    duration: 0.9,
    delay: 0.25,
    ease: 'power3.out'
  });

  gsap.from('.hero-visual-frame', {
    scale: 0.96,
    opacity: 0,
    duration: 1.1,
    delay: 0.35,
    ease: 'power3.out'
  });

  // Scroll triggers if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.method-block').forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.gradeplan-step-item').forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: 'power2.out'
      });
    });
  }
}
