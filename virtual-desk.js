// ===== NAVBAR MOBILE =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ===== MODAL OPEN / CLOSE =====
function openModal(id) {
  document.getElementById('modal-' + id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById('modal-' + id).classList.add('hidden');
  document.body.style.overflow = '';
}
function closeSuccess() {
  document.getElementById('modal-success').classList.add('hidden');
  document.body.style.overflow = '';
}

// Close on overlay click or Escape
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) { el.classList.add('hidden'); document.body.style.overflow = ''; }
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(el => {
      el.classList.add('hidden');
    });
    document.body.style.overflow = '';
  }
});

// ===== SHOW SUCCESS MODAL =====
function showSuccess(ref, msg) {
  document.getElementById('success-msg').textContent = msg;
  document.getElementById('success-ref').textContent = ref;
  document.getElementById('modal-success').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ===== SET BUTTON LOADING STATE =====
function setLoading(btn, loading) {
  if (loading) {
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.original;
    btn.disabled = false;
  }
}

// ===== APPOINTMENT FORM =====
document.querySelector('#modal-appointment form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  try {
    const data = {
      advocate_apt:  e.target.querySelector('input[name="advocate_apt"]:checked')?.value,
      name:          e.target.querySelector('input[type="text"]').value,
      id_passport:   e.target.querySelectorAll('input[type="text"]')[1]?.value,
      phone:         e.target.querySelector('input[type="tel"]').value,
      email:         e.target.querySelector('input[type="email"]').value,
      proposed_day:  e.target.querySelectorAll('input[type="text"]')[2]?.value,
      proposed_time: e.target.querySelectorAll('input[type="text"]')[3]?.value,
      legal_issue:   e.target.querySelector('textarea').value,
    };
    const ref = await saveAppointment(data);
    closeModal('appointment');
    e.target.reset();
    showSuccess(ref, 'Your appointment request has been saved. An advocate will confirm availability and contact you within 24 hours.');
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please check your connection and try again.');
  } finally {
    setLoading(btn, false);
  }
});

// ===== DOCUMENTS FORM =====
document.querySelector('#modal-documents form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  try {
    const inputs = e.target.querySelectorAll('input, select, textarea');
    const data = {
      client_name:   inputs[0].value,
      case_ref:      inputs[1].value,
      email:         inputs[2].value,
      phone:         inputs[3].value,
      document_type: e.target.querySelector('select').value,
      notes:         e.target.querySelector('textarea').value,
    };
    const fileInput = document.getElementById('docFiles');
    const files = fileInput ? Array.from(fileInput.files) : [];
    const ref = await saveDocuments(data, files);
    closeModal('documents');
    e.target.reset();
    document.getElementById('doc-file-list').innerHTML = '';
    showSuccess(ref, 'Your documents have been securely submitted. Your advocate will review them within 1 business day.');
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please check your connection and try again.');
  } finally {
    setLoading(btn, false);
  }
});

// ===== MOTOR VEHICLE FORM =====
document.querySelector('#modal-motor form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  try {
    const t = e.target;
    const data = {
      seller_name:  t.querySelectorAll('input[type="text"]')[0].value,
      buyer_name:   t.querySelectorAll('input[type="text"]')[1].value,
      seller_id:    t.querySelectorAll('input[type="text"]')[2].value,
      buyer_id:     t.querySelectorAll('input[type="text"]')[3].value,
      vehicle:      t.querySelectorAll('input[type="text"]')[4].value,
      registration: t.querySelectorAll('input[type="text"]')[5].value,
      sale_price:   t.querySelector('input[type="number"]').value,
      phone:        t.querySelector('input[type="tel"]').value,
      email:        t.querySelector('input[type="email"]').value,
      notes:        t.querySelector('textarea').value,
    };
    const ref = await saveMotorAgreement(data);
    closeModal('motor');
    e.target.reset();
    showSuccess(ref, 'Your motor vehicle agreement request has been received. Our advocates will draft and email you the agreement within 48 hours.');
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please check your connection and try again.');
  } finally {
    setLoading(btn, false);
  }
});

// ===== LAND AGREEMENT FORM =====
document.querySelector('#modal-land form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  try {
    const t = e.target;
    const data = {
      seller_name:  t.querySelectorAll('input[type="text"]')[0].value,
      buyer_name:   t.querySelectorAll('input[type="text"]')[1].value,
      seller_id:    t.querySelectorAll('input[type="text"]')[2].value,
      buyer_id:     t.querySelectorAll('input[type="text"]')[3].value,
      title_number: t.querySelectorAll('input[type="text"]')[4].value,
      land_size:    t.querySelectorAll('input[type="text"]')[5].value,
      location:     t.querySelectorAll('input[type="text"]')[6].value,
      sale_price:   t.querySelector('input[type="number"]').value,
      phone:        t.querySelector('input[type="tel"]').value,
      email:        t.querySelector('input[type="email"]').value,
      notes:        t.querySelector('textarea').value,
    };
    const ref = await saveLandAgreement(data);
    closeModal('land');
    e.target.reset();
    showSuccess(ref, 'Your land sale agreement request has been received. Our advocates will prepare your documents within 48 hours.');
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please check your connection and try again.');
  } finally {
    setLoading(btn, false);
  }
});

// ===== AFFIDAVIT FORM =====
document.querySelector('#modal-affidavit form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  try {
    const t = e.target;
    const data = {
      client_name:    t.querySelector('input[type="text"]').value,
      id_passport:    t.querySelectorAll('input[type="text"]')[1].value,
      phone:          t.querySelector('input[type="tel"]').value,
      email:          t.querySelector('input[type="email"]').value,
      affidavit_type: t.querySelector('select').value,
      facts:          t.querySelector('textarea').value,
    };
    const ref = await saveAffidavit(data);
    closeModal('affidavit');
    e.target.reset();
    showSuccess(ref, 'Your affidavit request has been received. Our advocates will draft it and contact you within 24–48 hours for signing.');
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please check your connection and try again.');
  } finally {
    setLoading(btn, false);
  }
});

// ===== SECURE MESSAGE FORM =====
document.querySelector('#modal-message form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  try {
    const t = e.target;
    const data = {
      advocate_msg: t.querySelector('input[name="advocate_msg"]:checked')?.value,
      client_name:  t.querySelectorAll('input[type="text"]')[0].value,
      case_ref:     t.querySelectorAll('input[type="text"]')[1].value,
      email:        t.querySelector('input[type="email"]').value,
      phone:        t.querySelector('input[type="tel"]').value,
      subject:      t.querySelectorAll('input[type="text"]')[2].value,
      message:      t.querySelector('textarea').value,
    };
    const ref = await saveMessage(data);
    closeModal('message');
    e.target.reset();
    showSuccess(ref, 'Your encrypted message has been delivered to your advocate. You will receive a response within 1 business day.');
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please check your connection and try again.');
  } finally {
    setLoading(btn, false);
  }
});

// ===== CASE TRACKER =====
async function runTracker() {
  const ref   = document.getElementById('trackRef').value.trim();
  const email = document.getElementById('trackEmail').value.trim();
  if (!ref)   { alert('Please enter your case reference number.'); return; }
  if (!email) { alert('Please enter your email address.'); return; }

  const btn = document.querySelector('#modal-tracker .btn-modal.teal');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
  btn.disabled = true;

  try {
    const result = await lookupCase(ref, email);
    if (result) {
      // Update the visible demo tracker with real data
      document.querySelector('.tr-ref').textContent = result.reference;
      document.querySelector('.tr-meta h4').textContent =
        'Matter — ' + (result.advocate || 'Assigned Advocate');
    }
    document.getElementById('tracker-result').classList.remove('hidden');
  } catch (err) {
    // Fall back to demo data if not found
    document.getElementById('tracker-result').classList.remove('hidden');
  } finally {
    btn.innerHTML = orig;
    btn.disabled = false;
  }
}

// ===== FILE UPLOAD =====
function showFiles(event, listId) {
  const list = document.getElementById(listId);
  Array.from(event.target.files).forEach(file => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `<i class="fas fa-file-alt"></i><span>${file.name}</span><span class="file-size">${(file.size/1024).toFixed(0)} KB</span><button class="rm" onclick="this.parentElement.remove()" title="Remove"><i class="fas fa-times"></i></button>`;
    list.appendChild(item);
  });
}

// Drag & drop on upload zone
const zone = document.querySelector('.upload-zone');
if (zone) {
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = '#E8962A'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    const list = document.getElementById('doc-file-list');
    Array.from(e.dataTransfer.files).forEach(file => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `<i class="fas fa-file-alt"></i><span>${file.name}</span><span class="file-size">${(file.size/1024).toFixed(0)} KB</span><button class="rm" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>`;
      list.appendChild(item);
    });
  });
}

// ===== STAFF LOGIN (no DB — internal redirect) =====
document.querySelector('#modal-staff form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-modal');
  setLoading(btn, true);
  setTimeout(() => {
    setLoading(btn, false);
    alert('Staff portal is not yet configured. Please contact the system administrator.');
  }, 1200);
});
