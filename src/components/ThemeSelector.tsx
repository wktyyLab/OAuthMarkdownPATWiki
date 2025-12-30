'use client';
import { useEffect, useState } from 'react';
import { getTheme, preloadTheme, selectDarkTheme, selectLightTheme, selectOSPreferenceTheme } from '@/lib/themeManager';

type ThemeName = 'light' | 'dark' | 'os';

const themeFunctions: {
  theme: ThemeName;
  func: () => void;
  icon: string;
  title: string;
}[] = [
  { theme: 'light', func: selectLightTheme, icon: 'i-tabler-sun', title: 'ライトテーマ' },
  { theme: 'dark', func: selectDarkTheme, icon: 'i-tabler-moon', title: 'ダークテーマ' },
  { theme: 'os', func: selectOSPreferenceTheme, icon: 'i-tabler-sun-moon', title: 'システム設定' },
];

export default function ThemeSelector() {
  const [nowTheme, setNowTheme] = useState<ThemeName | null>();

  useEffect(() => {
    setNowTheme(getTheme());
    preloadTheme();
  }, []);

  const theme = themeFunctions.find((t) => t.theme === nowTheme);

  const handleThemeToggle = () => {
    const nextThemeIndex = (themeFunctions.findIndex((t) => t.theme === nowTheme) + 1) % themeFunctions.length;
    const nextTheme = themeFunctions[nextThemeIndex];
    nextTheme.func();
    setNowTheme(nextTheme.theme);
    preloadTheme();
  };

  return (
    <div className='group relative z-auto'>
      <button
        onClick={handleThemeToggle}
        className='flex size-6 items-center justify-center rounded-3xl bg-gray-100 transition-colors dark:bg-slate-800'
      >
        {theme ? <span className={`${theme.icon} size-4`} title='テーマスイッチャー' /> : null}
      </button>
      <div className='absolute -left-2 top-5 z-30 hidden flex-col gap-1 rounded-3xl bg-gray-200 px-1.5 py-2 drop-shadow-lg transition-colors group-hover:flex dark:bg-slate-700'>
        {themeFunctions.map((item, i) => (
          <button
            className='relative z-auto flex size-7 items-center justify-center rounded-3xl transition-colors hover:bg-gray-300 dark:hover:bg-slate-600'
            key={i}
            title={`${item.theme}に変更`}
            onClick={() => {
              item.func();
              setNowTheme(item.theme);
              preloadTheme();
            }}
          >
            <span className={`${item.icon} size-6`} />
          </button>
        ))}
      </div>
    </div>
  );
}
