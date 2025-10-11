import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark" | "system";

const themes: { key: Theme; icon: typeof FiSun; label: string }[] = [
    { key: "light", icon: FiSun, label: "Light" },
    { key: "dark", icon: FiMoon, label: "Dark" },
    { key: "system", icon: FiMonitor, label: "System" },
];

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>("system");
    const [mounted, setMounted] = useState(false);

    const applyTheme = useCallback((newTheme: Theme) => {
        const root = document.documentElement;
        
        // Temporarily disable transitions to prevent flash
        root.style.transition = 'none';
        
        root.classList.remove("light", "dark");
        
        if (newTheme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.add(prefersDark ? "dark" : "light");
        } else {
            root.classList.add(newTheme);
        }
        
        // Re-enable transitions after a small delay
        setTimeout(() => {
            root.style.transition = '';
        }, 50);
    }, []);

    useEffect(() => {
        setMounted(true);
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, [applyTheme]);

    useEffect(() => {
        if (!mounted || theme !== "system") return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => theme === "system" && applyTheme("system");
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, applyTheme, mounted]);

    if (!mounted) return <div className="flex items-center rounded-lg border border-gray-300 dark:border-white/10 bg-gray-200/80 dark:bg-white/[0.03] p-1 shadow-sm"><div className="w-8 h-8" /></div>;

    return (
        <div className="flex items-center rounded-lg border border-gray-300 dark:border-white/10 bg-gray-200/80 dark:bg-white/[0.03] p-1 shadow-sm">
            {themes.map(({ key, icon: Icon, label }) => (
                <motion.button
                    key={key}
                    onClick={() => {
                        setTheme(key);
                        localStorage.setItem("theme", key);
                        applyTheme(key);
                    }}
                    className={`relative rounded-md p-2 text-sm font-medium transition-colors ${
                        theme === key ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                    aria-label={`Switch to ${label.toLowerCase()} theme`}
                >
                    {theme === key && (
                        <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 rounded-md bg-white dark:bg-white/10 shadow-sm border border-gray-300/60 dark:border-white/5"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                    )}
                    <Icon className="relative z-10 h-4 w-4" />
                </motion.button>
            ))}
        </div>
    );
};

export default memo(ThemeToggle);
