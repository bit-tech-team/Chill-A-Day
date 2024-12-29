import React, { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark"); // Tema predeterminado

  // Cambia entre "dark" y "light"
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Lee el tema guardado en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Guarda el tema seleccionado
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};
