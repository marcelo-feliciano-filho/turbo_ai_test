import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm";
import { signupUser, setAuthToken } from "../../utils/api";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const signupResponse = await signupUser(email, password);
      console.log("Signup Response:", signupResponse); // ✅ Debugging response

      if (signupResponse.access) {
        setAuthToken(signupResponse.access);
        console.log("Token Set:", localStorage.getItem("authToken")); // ✅ Ensure token is stored
        setTimeout(() => {
          router.replace("/");
        }, 100); // ✅ Allow token storage before redirection
      } else {
        console.warn("Signup succeeded, but no token received.");
        router.replace("/");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <AuthForm
      title="Yay, New Friend!"
      mascot="/cat.png"
      onSubmit={handleSignup}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Sign Up"
      altText="We're already friends!"
      onAltClick={() => router.push("/auth/login")}
      error={error}
    />
  );
}
