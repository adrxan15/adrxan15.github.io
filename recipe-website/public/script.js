const toggleBtn = document.getElementById('toggle-mode');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
});
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.body.classList.add('dark-mode');
});