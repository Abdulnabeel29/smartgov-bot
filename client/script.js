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
  results.innerHTML = '<div id="loading" style="text-align:center;color:#1565C0;">Loading...</div>';

  // Validate inputs
  const errors = validateForm(age, income, caste, state);
  if (errors.length > 0) {
    results.innerHTML = `<div style="width:100%;text-align:center;color:#e53935;">${errors.join('<br>')}</div>`;
    return;
  }

  // Save user data to backend
  fetch('/userdata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ age, income, caste, state })
  })
  .then(res => res.json())
  .then(() => {
    // Optionally, fetch schemes or just show a success message
    results.innerHTML = '<div style="width:100%;text-align:center;color:green;">Data submitted successfully!</div>';
    // Clear form fields after successful submission
    document.getElementById('age').value = '';
    document.getElementById('income').value = '';
    document.getElementById('caste').value = '';
    document.getElementById('state').value = '';
  })
  .catch(() => {
    results.innerHTML = '<div style="width:100%;text-align:center;color:#e53935;">Error saving data. Please try again later.</div>';
    // Still clear form fields to allow retry
    document.getElementById('age').value = '';
    document.getElementById('income').value = '';
    document.getElementById('caste').value = '';
    document.getElementById('state').value = '';
  });
}

document.getElementById('logo').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    window.scrollTo({top:0, behavior:'smooth'});
  }
});