/* ============================================================
   TERMINAL.JS — Interactive CLI terminal engine
   Anikethana Reddy J L — Dark Cyber-Terminal Portfolio
============================================================ */

(function initTerminal() {
  const outputEl = document.getElementById('terminal-output');
  const inputEl  = document.getElementById('terminal-input');
  const body     = document.getElementById('terminal-body');

  if (!outputEl || !inputEl) return;

  const history = [];
  let historyIdx = -1;

  /* ── Command Registry ──────────────────────────────────── */
  const COMMANDS = {
    help() {
      printSection('AVAILABLE COMMANDS');
      printLine('  whoami      — identity matrix');
      printLine('  resume      — access & view official resume PDF');
      printLine('  skills      — tech stack manifest');
      printLine('  projects    — project index');
      printLine('  experience  — timeline log');
      printLine('  contact     — uplink protocols');
      printLine('  design      — UI/UX design tools');
      printLine('  clear       — flush terminal buffer');
      printLine('  banner      — print welcome banner');
      printLine('  date        — system timestamp');
      printLine('  github      — open GitHub profile');
      printLine('  linkedin    — open LinkedIn profile');
      printLine('  ping        — test connection');
    },

    whoami() {
      printSection('IDENTITY MATRIX');
      printLine('  Name        : Anikethana Reddy J L');
      printLine('  Role        : SDE Intern @ My Startup Wave');
      printLine('  Location    : Bengaluru, India');
      printLine('  Focus       : Distributed Systems + GenAI Architectures');
      printLine('  Status      : 🟢 Available for opportunities');
    },

    skills() {
      printSection('TECH STACK MANIFEST');
      printLine('  [Frontend]    React 19, Next.js 14, TypeScript, Tailwind');
      printLine('  [Backend]     FastAPI, Node.js, Express 5, Python 3.12');
      printLine('  [Distributed] Apache Kafka, Redis 7, Redpanda, BullMQ');
      printLine('  [Databases]   MongoDB, PostgreSQL, Upstash Redis');
      printLine('  [GenAI]       Gemini 2.0, LangGraph, LangChain, Mistral');
      printLine('  [DevOps]      Docker, Kubernetes, GitHub Actions, Nginx');
      printLine('  [UI/UX]       Figma, Google Stitch');
    },

    design() {
      printSection('UI/UX DESIGN TOOLS');
      printLine('  [Figma]');
      printLine('    > Component systems & design tokens');
      printLine('    > Interactive prototyping & user flows');
      printLine('    > Auto-layout, variants & responsive specs');
      printLine('    > Dev handoff & annotation');
      printLine('');
      printLine('  [Google Stitch]');
      printLine('    > AI-powered UI generation with Gemini');
      printLine('    > Rapid wireframing & concept exploration');
      printLine('    > Pixel-to-code acceleration pipelines');
      printLine('');
      printLine('  Philosophy: Engineering isn\'t just about systems —');
      printLine('             it\'s about interfaces humans love.');
    },

    projects() {
      printSection('PROJECT INDEX');
      printLine('  01 ONE SWAGGER     — OpenAPI DevTool (VSCode + Chrome)');
      printLine('     > React 19 · FastAPI · TypeScript · Manifest V3');
      printLine('');
      printLine('  02 RPREP AI        — GenAI Career Co-Pilot [LIVE]');
      printLine('     > Gemini 2.0 · React 19 · Express 5 · MongoDB');
      printLine('');
      printLine('  03 SHORTLY         — Event-Driven URL Shortener [LIVE]');
      printLine('     > FastAPI · Redpanda Kafka · Upstash Redis · Next.js');
      printLine('');
      printLine('  04 ILAP AUTOMATION — Conversational RBAC Platform [Finalist]');
      printLine('     > SRIJAN 2026 National Finalist · SIH contributor');
      printLine('');
      printLine('  05 RAG MULTI-AGENT — Autonomous Research Pipeline');
      printLine('     > LangGraph · Mistral · Tavily · Streamlit');
      printLine('');
      printLine('  06 NEETCODE 150    — DSA Master Curriculum Guide');
      printLine('     > 150 problems · Python · Interactive Web Doc');
    },

    experience() {
      printSection('TIMELINE LOG');
      printLine('  2026 → Present   SDE Intern @ My Startup Wave');
      printLine('  2026             National Finalist — SRIJN 2026');
      printLine('  2026             Creator — One Swagger (VSCode + Chrome)');
      printLine('  2026             Founder — rPrep AI');
    },

    contact() {
      printSection('UPLINK PROTOCOLS');
      printLine('  Email     : anikethana2109@gmail.com');
      printLine('  LinkedIn  : linkedin.com/in/anikethana-reddy-j-l-8716ab296');
      printLine('  GitHub    : github.com/anikethana21');
      printLine('  Status    : 🟢 Open to roles & collaborations');
    },

    clear() {
      outputEl.innerHTML = '';
      return; // no trailing newline needed
    },

    banner() {
      printLine('');
      printLine(' █████╗ ███╗   ██╗██╗██╗  ██╗███████╗████████╗██╗  ██╗');
      printLine('██╔══██╗████╗  ██║██║██║ ██╔╝██╔════╝╚══██╔══╝██║  ██║');
      printLine('███████║██╔██╗ ██║██║█████╔╝ █████╗     ██║   ███████║');
      printLine('██╔══██║██║╚██╗██║██║██╔═██╗ ██╔══╝     ██║   ██╔══██║');
      printLine('██║  ██║██║ ╚████║██║██║  ██╗███████╗   ██║   ██║  ██║');
      printLine('╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝');
      printLine('');
      printLine('  Portfolio Terminal v1.0.0 · Bengaluru Node · Online');
      printLine('  Type `help` for available commands.');
      printLine('');
    },

    date() {
      const now = new Date();
      printLine(`  ${now.toUTCString()}`);
      printLine(`  Timezone: IST (UTC+5:30) · Bengaluru, India`);
    },

    github() {
      printLine('  Opening GitHub profile...');
      setTimeout(() => window.open('https://github.com/anikethana21', '_blank', 'noopener'), 600);
    },

    linkedin() {
      printLine('  Opening LinkedIn profile...');
      setTimeout(() => window.open('https://www.linkedin.com/in/anikethana-reddy-j-l-8716ab296/', '_blank', 'noopener'), 600);
    },

    ping() {
      printLine('  PING portfolio.aniketh.dev (127.0.0.1) 56 bytes of data.');
      setTimeout(() => printLine('  64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms'), 300);
      setTimeout(() => printLine('  64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.038 ms'), 600);
      setTimeout(() => {
        printLine('');
        printLine('  --- ping statistics ---');
        printLine('  2 packets transmitted, 2 received, 0% packet loss');
        printLine('  Round-trip avg: 0.040 ms · Connection: ESTABLISHED');
      }, 900);
    },

    resume() {
      printSection('CURRICULUM VITAE / OFFICIAL RESUME');
      printLine('  Candidate   : Anikethana Reddy J L');
      printLine('  Role        : Software Engineering Intern @ MyStartupWave');
      printLine('  Education   : M. S. Ramaiah Univ of Applied Sciences (B.Tech CSE, 8.75 CGPA)');
      printLine('  Projects    : One Swagger, RPrep, Shortly, Multi-Agent Research Pipeline');
      printLine('  Stack       : Python, FastAPI, Node.js, Express, Kafka, Redis, Docker, K8s');
      printLine('  File        : assets/Anikethana_Reddy_Resume.pdf [132 KB]');
      printLine('');
      printLine('  Opening official PDF document in browser...');
      setTimeout(() => {
        window.open('assets/Anikethana_Reddy_Resume.pdf', '_blank', 'noopener');
      }, 500);
    },

    cv() {
      COMMANDS.resume();
    },
  };

  /* ── Print Helpers ─────────────────────────────────────── */
  function printLine(text = '', cls = 't-output') {
    const div = document.createElement('div');
    div.className = `t-line ${cls}`;
    div.textContent = text;
    outputEl.appendChild(div);
    scrollBottom();
  }

  function printSection(title) {
    printLine('');
    const div = document.createElement('div');
    div.className = 't-line t-section-head';
    div.textContent = `── ${title} ──────────────────────`;
    outputEl.appendChild(div);
  }

  function printCmdEcho(cmd) {
    const div = document.createElement('div');
    div.className = 't-line t-cmd';
    div.textContent = cmd;
    outputEl.appendChild(div);
  }

  function scrollBottom() {
    body.scrollTop = body.scrollHeight;
  }

  /* ── Command Execution ─────────────────────────────────── */
  function execute(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(cmd);
    historyIdx = -1;

    printCmdEcho(raw.trim());

    if (COMMANDS[cmd]) {
      COMMANDS[cmd]();
      printLine('');
    } else {
      printLine(`  bash: ${cmd}: command not found. Type 'help' for available commands.`, 't-error');
      printLine('');
    }
    scrollBottom();
  }

  /* ── Input Handler ─────────────────────────────────────── */
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      execute(val);
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        historyIdx++;
        inputEl.value = history[historyIdx] || '';
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        inputEl.value = history[historyIdx] || '';
      } else {
        historyIdx = -1;
        inputEl.value = '';
      }
    }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputEl.value.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(val));
      if (match) inputEl.value = match;
    }
  });

  /* ── Quick Buttons ─────────────────────────────────────── */
  document.querySelectorAll('.t-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        inputEl.value = cmd;
        execute(cmd);
        inputEl.value = '';
        inputEl.focus();
      }
    });
  });

  /* ── Click-to-focus ────────────────────────────────────── */
  document.getElementById('terminal-body')?.addEventListener('click', () => {
    inputEl.focus();
  });

  /* ── Auto-focus on reaching terminal section ────────────── */
  const termSection = document.getElementById('terminal');
  if (termSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) inputEl.focus();
      });
    }, { threshold: 0.4 });
    io.observe(termSection);
  }

})();
