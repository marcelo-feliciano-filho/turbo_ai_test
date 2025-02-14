import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm";
import { loginUser } from "../../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (!data.access) throw new Error("Login failed: No token received.");

      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthForm
      title="Yay, You're Back!"
      mascot="/cactus.png"
      onSubmit={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Login"
      altText="Oops! I've never been here before"
      onAltClick={() => router.push("/auth/signup")}
    />
  );
}
