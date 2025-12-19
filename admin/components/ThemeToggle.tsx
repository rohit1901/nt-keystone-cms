"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type Theme = "light" | "dark";

const PRIMARY_STORAGE_KEY = "sb-react-daisyui-preview-theme";
const LEGACY_STORAGE_KEY = "nt-keystone-admin-theme";
const STORAGE_KEYS = [PRIMARY_STORAGE_KEY, LEGACY_STORAGE_KEY] as const;
const DARK_CLASS = "dark";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }

  root.setAttribute("data-theme", theme);
  root.dataset.theme = theme;
  if (document.body) {
    document.body.setAttribute("data-theme", theme);
    document.body.dataset.theme = theme;
    document.body.style.colorScheme = theme;
  }
  root.style.colorScheme = theme;
}

function getPreferredTheme(): { theme: Theme; explicit: boolean } {
  if (typeof window === "undefined") {
    return { theme: "light", explicit: false };
  }

  for (const key of STORAGE_KEYS) {
    const stored = window.localStorage.getItem(key);

    if (stored === "light" || stored === "dark") {
      if (key === LEGACY_STORAGE_KEY) {
        try {
          window.localStorage.setItem(PRIMARY_STORAGE_KEY, stored);
        } catch {
          /* noop */
        }
      }
      return { theme: stored, explicit: true };
    }
  }

  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

  return { theme: prefersDark ? "dark" : "light", explicit: false };
}

if (typeof document !== "undefined") {
  const { theme } = getPreferredTheme();
  applyTheme(theme);
}

export type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const hasExplicitPreferenceRef = useRef(false);

  useEffect(() => {
    const { theme: initialTheme, explicit } = getPreferredTheme();

    hasExplicitPreferenceRef.current = explicit;
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemPreferenceChange = (event: MediaQueryListEvent) => {
      if (hasExplicitPreferenceRef.current) {
        return;
      }

      const nextTheme: Theme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleSystemPreferenceChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleSystemPreferenceChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleSystemPreferenceChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleSystemPreferenceChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || !hasExplicitPreferenceRef.current) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    for (const key of STORAGE_KEYS) {
      window.localStorage.setItem(key, theme);
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const nextTheme: Theme = current === "light" ? "dark" : "light";

      hasExplicitPreferenceRef.current = true;
      applyTheme(nextTheme);

      return nextTheme;
    });
  }, []);

  const resolvedTheme = mounted ? theme : "light";
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={
        isDark ? "Activate light color scheme" : "Activate dark color scheme"
      }
      onClick={toggleTheme}
      className={cn("relative overflow-hidden", className)}
    >
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      <SunIcon
        className={cn(
          "absolute inset-0 m-auto h-5 w-5 transition-transform duration-300",
          isDark ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100",
        )}
      />
      <MoonIcon
        className={cn(
          "absolute inset-0 m-auto h-5 w-5 transition-transform duration-300",
          isDark ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      />
    </Button>
  );
}

type IconProps = {
  className?: string;
};

function SunIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
