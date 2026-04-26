export type RamThemeMode = "light" | "dark";

const STORAGE_KEY = "ram-theme";

export function useRamTheme() {
  const mode = useState<RamThemeMode>("ram-theme", () => "light");

  const apply = (next: RamThemeMode) => {
    if (!import.meta.client) return;
    const html = document.documentElement;
    html.classList.remove("ram-light", "ram-dark");
    html.classList.add(`ram-${next}`);
  };

  const set = (next: RamThemeMode) => {
    mode.value = next;
    if (import.meta.client) {
      window.localStorage.setItem(STORAGE_KEY, next);
      apply(next);
    }
  };

  const toggle = () => set(mode.value === "light" ? "dark" : "light");

  if (import.meta.client) {
    onMounted(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY) as RamThemeMode | null;
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const initial = saved ?? prefers;
      mode.value = initial;
      apply(initial);
    });
  }

  return { mode, set, toggle };
}
