function validateForm(age, income, caste, state) {
  let errors = [];
  if (!age || age < 0 || age > 120) errors.push("Please enter a valid age.");
  if (!income || income < 0) errors.push("Please enter a valid income.");
  if (!caste) errors.push("Please select your caste.");
  if (!state) errors.push("Please select your state.");
  return errors;
}

function submitDetails() {
  const age = document.getElementById('age').value;
  const income = document.getElementById('income').value;
  const caste = document.getElementById('caste').value;
  const state = document.getElementById('state').value;

  const results = document.getElementById('results');
  const loading = document.getElementById('loading');
  results.innerHTML = '';
  loading.style.display = 'block';

  // Validate inputs
  const errors = validateForm(age, income, caste, state);
  if (errors.length > 0) {
    loading.style.display = 'none';
    results.innerHTML = `<div style="width:100%;text-align:center;color:#e53935;">${errors.join('<br>')}</div>`;
    return;
  }

  fetch('http://localhost:5000/api/schemes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ age, income, caste, state })
  })
  .then(res => res.json())
  .then(data => {
    loading.style.display = 'none';
    if (!data.length) {
      results.innerHTML = '<div style="width:100%;text-align:center;color:#888;">No schemes found for your details. Try adjusting your inputs.</div>';
      return;
    }
    data.forEach(scheme => {
      const card = document.createElement('div');
      card.className = 'scheme-card';
      card.innerHTML = `
        <h3><i class="fas fa-gift" style="margin-right:8px;color:var(--accent-color);"></i>${scheme.name}</h3>
        <p>${scheme.description}</p>
        <a href="${scheme.link}" target="_blank" aria-label="Apply for ${scheme.name}">Apply Now</a>
      `;
      results.appendChild(card);
    });
  })
  .catch(() => {
    loading.style.display = 'none';
    results.innerHTML = '<div style="width:100%;text-align:center;color:#e53935;">Error fetching schemes. Please try again later.</div>';
  });
}

document.getElementById('logo').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    window.scrollTo({top:0, behavior:'smooth'});
  }
});