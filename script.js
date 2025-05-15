const typedNameEl = document.getElementById('typed-name');
const typedTaglineEl = document.getElementById('typed-tagline');
const profilePic = document.getElementById('profile-pic');
const navLinks = document.querySelectorAll('nav .nav-link');
const sectionHeaders = document.querySelectorAll('.collapsible-header');
const themeToggle = document.getElementById('themeToggle');

const sectionsData = {
  about: `I’m Arijit Pal, a passionate Machine Learning enthusiast skilled in Python and AI project development.
I enjoy solving complex problems and quickly learning new technologies.
I thrive on creating practical, data-driven solutions and continuously growing my expertise.`,
  
  projects: [
    "🔹 Traffic Prediction using Random Forest",
    "🔹 AI Chatbot using NLP",
    "🔹 Image Classifier with CNN"
  ],
  
  skills: [
    { skill: "Python", level: 90 },
    { skill: "Machine Learning", level: 85 },
    { skill: "JavaScript", level: 70 }
  ],
  
  contact: [
    { type: "Email", value: "arijitpal090@gmail.com", href: "mailto:arijitpal090@gmail.com" },
    { type: "Phone", value: "8617699217", href: "tel:8617699217" }
  ]
};

const typingSpeed = 70;

let nameText = "Arijit Pal";
let nameIndex = 0;

function typeName() {
  if (nameIndex < nameText.length) {
    typedNameEl.textContent += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeName, typingSpeed);
  } else {
    setTimeout(typeTagline, typingSpeed);
  }
}

const taglineText = "Developer, Problem Solver, Quick Learner";
let taglineIndex = 0;
function typeTagline() {
  if (taglineIndex < taglineText.length) {
    typedTaglineEl.textContent += taglineText.charAt(taglineIndex);
    taglineIndex++;
    setTimeout(typeTagline, typingSpeed);
  }
}

function typeText(container, text, callback) {
  let i = 0;
  container.textContent = '';
  function type() {
    if (i < text.length) {
      container.textContent += text.charAt(i);
      i++;
      setTimeout(type, typingSpeed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function typeArray(container, arr, callback) {
  container.textContent = '';
  let i = 0;
  function typeLine() {
    if (i < arr.length) {
      container.textContent += arr[i] + '\n';
      i++;
      setTimeout(typeLine, typingSpeed * 6);
    } else if (callback) {
      callback();
    }
  }
  typeLine();
}

function showSkills(container, skills) {
  container.innerHTML = '';
  skills.forEach(({ skill, level }) => {
    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skill');

    const label = document.createElement('label');
    label.textContent = skill;

    const barContainer = document.createElement('div');
    barContainer.classList.add('skill-bar');

    const bar = document.createElement('div');
    bar.classList.add('skill-level');
    bar.style.width = '0%';
    bar.textContent = level + '%';

    barContainer.appendChild(bar);
    skillDiv.appendChild(label);
    skillDiv.appendChild(barContainer);
    container.appendChild(skillDiv);

    // Animate bar fill
    setTimeout(() => {
      bar.style.width = level + '%';
    }, 100);
  });
}

function showContact(container, contacts) {
  container.innerHTML = '';
  contacts.forEach(({ type, value, href }) => {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = `${type}: ${value}`;
    p.appendChild(a);
    container.appendChild(p);
  });
}

function clearActiveNav() {
  navLinks.forEach(link => link.classList.remove('active'));
}

function activateNavById(id) {
  clearActiveNav();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + id) {
      link.classList.add('active');
    }
  });
}

function collapseAll() {
  sectionHeaders.forEach(header => {
    header.classList.remove('active');
    header.setAttribute('aria-expanded', 'false');
    const content = document.getElementById(header.getAttribute('aria-controls'));
    content.textContent = '';
  });
}

function openSection(id) {
  collapseAll();
  const header = document.querySelector(`.collapsible-header[aria-controls="${id}-content"]`);
  const content = document.getElementById(`${id}-content`);
  header.classList.add('active');
  header.setAttribute('aria-expanded', 'true');

  if (id === 'about') {
    typeText(content, sectionsData.about);
  } else if (id === 'projects') {
    typeArray(content, sectionsData.projects);
  } else if (id === 'skills') {
    showSkills(content, sectionsData.skills);
  } else if (id === 'contact') {
    showContact(content, sectionsData.contact);
  }

  activateNavById(id);
}

// On header click open section with typing effect
sectionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const id = header.getAttribute('aria-controls').replace('-content', '');
    openSection(id);
  });

  header.addEventListener('keypress', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

// Nav links open sections on click
navLinks.forEach(link => {
  if (link.getAttribute('href').startsWith('#')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      openSection(id);
    });
  }
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }
});

// Initialize
window.onload = () => {
  typeName();
  // Open About by default after name and tagline typed
  setTimeout(() => openSection('about'), typingSpeed * (nameText.length + taglineText.length + 20));
};
