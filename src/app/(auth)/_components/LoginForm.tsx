"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Simulación (después lo conectás a tu API / auth)
      await new Promise((r) => setTimeout(r, 800));

      if (!email || !password) throw new Error("Completá email y contraseña.");

      // ejemplo: redirigir o setear sesión
      alert(`Login OK: ${email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "grid",
        gap: 10,
        padding: 16,
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 12,
      }}
    >
      <label style={{ display: "grid", gap: 6 }}>
        <span>Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Contraseña</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
        />
      </label>

      {error && <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: 10,
          borderRadius: 10,
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
}
