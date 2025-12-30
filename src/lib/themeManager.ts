export function preloadTheme() {
  document.documentElement.classList.remove('light', 'dark');

  const theme =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';

  document.documentElement.classList.add(theme);
}

export function getTheme() {
  if (!('theme' in localStorage)) return 'os';
  else if (localStorage.theme === 'dark') return 'dark';
  else return 'light';
}

export function selectLightTheme() {
  localStorage.theme = 'light';
}

export function selectDarkTheme() {
  localStorage.theme = 'dark';
}

export function selectOSPreferenceTheme() {
  localStorage.removeItem('theme');
}

export function getIsDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
