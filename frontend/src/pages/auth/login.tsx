import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm";
import { loginUser, setAuthToken } from "../../utils/api";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(email, password);

      if (!data.access) throw new Error("Login failed: No token received.");

      setAuthToken(data.access);
      router.replace("/");
    } catch (err: unknown) { // ✅ Fixed "any" type
      console.error("Login failed:", (err as Error).message);

      setError(
        (err as { response?: { status: number } }).response?.status === 401
          ? "Invalid email or password. Please try again."
          : "An error occurred. Please try again later."
      );
    }
  };

  return (
    <AuthForm
      title="Welcome Back!"
      mascot="/cactus.png"
      onSubmit={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Login"
      altText="Oops! I've never been here before"
      onAltClick={() => router.push("/auth/signup")}
      error={error}
    />
  );
}
