const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const STORAGE_KEY = 'js-checklist-progress';
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// загрузка сохранённых данных
const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// применяем сохранённое состояние
checkboxes.forEach(checkbox => {
  const id = checkbox.dataset.id;

  if (savedProgress[id]) {
    checkbox.checked = true;
  }

  checkbox.addEventListener('change', () => {
    savedProgress[id] = checkbox.checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgress));
    updateProgress();
  });
});

// Обновление прогресса
function updateProgress() {
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percent = Math.round((checked / total) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = percent + '%';
}

// начальный прогресс
updateProgress();
