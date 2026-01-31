import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Iniciar sesión</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Ingresá tus credenciales para continuar.
      </p>

      <LoginForm />
    </div>
  );
}
