const THEMES = ['sandstone', 'charcoal-coffee'];
const STORAGE_KEY = 'preferred-theme';

function setTheme(themeName) {
  const root = document.documentElement;
  THEMES.forEach(t => root.classList.remove(`theme-${t}`));
  root.classList.add(`theme-${themeName}`);

  const themeButton = document.getElementById('single-theme-button');
  if (themeButton) themeButton.setAttribute('data-theme', themeName);

  const hazelLogo = document.getElementById('hazel-logo');
  if (hazelLogo) {
    hazelLogo.src = themeName === 'sandstone'
      ? 'images/hazelbot_dark.svg'
      : 'images/hazelbot_light.svg';
  }

  localStorage.setItem(STORAGE_KEY, themeName);
}

function cycleTheme() {
  const current = localStorage.getItem(STORAGE_KEY) || 'charcoal-coffee';
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  setTheme(next);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(STORAGE_KEY) || 'charcoal-coffee';
  setTheme(saved);

  const themeButton = document.getElementById('single-theme-button');
  if (themeButton) themeButton.addEventListener('click', cycleTheme);
});
