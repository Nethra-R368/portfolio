/* ==========================================================================
   NETHRA RAJENDRAN PORTFOLIO — JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
      }
    });
  }

  // --- Mobile Navigation Menu ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // --- Active Nav Link Spy on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // --- Project Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- Copy Citation Button ---
  const copyBtns = document.querySelectorAll('.copy-cite-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const citation = btn.getAttribute('data-cite');
      if (citation) {
        navigator.clipboard.writeText(citation).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<i data-lucide="check"></i> <span>Copied!</span>`;
          if (window.lucide) window.lucide.createIcons();

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            if (window.lucide) window.lucide.createIcons();
          }, 2500);
        }).catch(err => {
          console.error('Could not copy citation:', err);
        });
      }
    });
  });

  // --- Interactive Card Spotlight Effect ---
  const cards = document.querySelectorAll('.metric-card, .skill-group-card, .pub-card, .project-card, .award-card, .education-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// --- Contact Form Submission Handler ---
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const subject = form.subject.value;
  const message = form.message.value;
  const statusDiv = document.getElementById('form-status');

  const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:nethrar368@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  statusDiv.innerHTML = `<span style="color: #34d399;">Opening your mail client to send to Nethra...</span>`;

  window.open(mailtoUrl, '_blank');

  setTimeout(() => {
    form.reset();
    statusDiv.innerHTML = `<span style="color: #94a3b8;">Email client opened! You can also reach Nethra directly at nethrar368@gmail.com</span>`;
  }, 1500);
}
