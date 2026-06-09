// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== VIRTUAL DESK =====
const tabs = ['consultation', 'documents', 'tracker', 'message'];

function openVDesk(tabId) {
  // Hide all tabs
  tabs.forEach(t => {
    document.getElementById('tab-' + t).classList.add('hidden');
  });

  // Remove active state from feature cards
  document.querySelectorAll('.vdesk-feature').forEach(f => f.classList.remove('active'));

  // Show selected tab
  document.getElementById('tab-' + tabId).classList.remove('hidden');

  // Hide success
  document.getElementById('vdeskSuccess').classList.add('hidden');

  // Show portal
  const portal = document.getElementById('vdeskPortal');
  portal.style.display = 'block';

  // Mark active feature card
  const idx = tabs.indexOf(tabId);
  document.querySelectorAll('.vdesk-feature')[idx]?.classList.add('active');

  // Scroll to portal
  setTimeout(() => {
    portal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function closeVDesk() {
  document.getElementById('vdeskPortal').style.display = 'none';
  document.getElementById('vdeskSuccess').classList.add('hidden');
  document.querySelectorAll('.vdesk-feature').forEach(f => f.classList.remove('active'));
}

function resetVDesk() {
  document.getElementById('vdeskSuccess').classList.add('hidden');
  document.getElementById('vdeskPortal').style.display = 'none';
  document.querySelectorAll('.vdesk-feature').forEach(f => f.classList.remove('active'));
  document.getElementById('virtual-desk').scrollIntoView({ behavior: 'smooth' });
}

const successMessages = {
  consultation: 'Your consultation has been booked! We will confirm your appointment via email within 2 hours.',
  documents: 'Your documents have been submitted securely. Your advocate will review them shortly.',
  message: 'Your message has been delivered securely to your advocate.'
};

function handleVDeskSubmit(event, type) {
  event.preventDefault();
  document.getElementById('vdeskPortal').style.display = 'none';
  const success = document.getElementById('vdeskSuccess');
  document.getElementById('successMessage').textContent = successMessages[type] || 'Your request has been received.';
  success.classList.remove('hidden');
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Case tracker
function trackCase() {
  const ref = document.getElementById('caseRef').value.trim();
  const email = document.getElementById('caseEmail').value.trim();
  if (!ref) { alert('Please enter a case reference number.'); return; }
  // Demo: show mock result
  document.getElementById('caseResult').classList.remove('hidden');
  document.getElementById('caseResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// File upload
function handleFileSelect(event) {
  const files = Array.from(event.target.files);
  const list = document.getElementById('fileList');
  files.forEach(file => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `<i class="fas fa-file-alt"></i> ${file.name} <span style="margin-left:auto;color:var(--text-light);font-size:0.75rem">${(file.size/1024).toFixed(0)} KB</span>`;
    list.appendChild(item);
  });
}

// Drag & drop upload
const uploadZone = document.getElementById('uploadZone');
if (uploadZone) {
  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.style.borderColor = 'var(--gold)';
    uploadZone.style.background = 'rgba(201,168,76,0.05)';
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.borderColor = '';
    uploadZone.style.background = '';
  });
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.style.borderColor = '';
    uploadZone.style.background = '';
    const dt = e.dataTransfer;
    const list = document.getElementById('fileList');
    Array.from(dt.files).forEach(file => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `<i class="fas fa-file-alt"></i> ${file.name} <span style="margin-left:auto;color:var(--text-light);font-size:0.75rem">${(file.size/1024).toFixed(0)} KB</span>`;
      list.appendChild(item);
    });
  });
}

// Contact form
function handleContactSubmit(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('contactSuccess').classList.remove('hidden');
    btn.textContent = 'Send Message';
    btn.disabled = false;
    event.target.reset();
  }, 1200);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .why-card, .vdesk-feature');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});

// Init: hide portal
document.addEventListener('DOMContentLoaded', () => {
  const portal = document.getElementById('vdeskPortal');
  if (portal) portal.style.display = 'none';
});
