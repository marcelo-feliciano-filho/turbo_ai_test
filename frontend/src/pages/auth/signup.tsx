import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm";
import { signupUser, loginUser } from "../../utils/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const signupResponse = await signupUser(email, password);

      if (signupResponse.token) {
        localStorage.setItem("authToken", signupResponse.token);
        router.push("/");
        return;
      }
    } catch (signupError) {
      console.error("Signup Error:", signupError);

      // If the user already exists, try logging them in automatically
      if (signupError.response?.status === 400) {
        console.log("User already exists, attempting login...");

        try {
          const loginResponse = await loginUser(email, password);

          if (loginResponse.access) {
            localStorage.setItem("authToken", loginResponse.access);
            router.push("/");
          } else {
            setError("Login failed: No token received.");
          }
        } catch (loginError) {
          console.error("Login Error:", loginError);
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("Signup failed. Please try again.");
      }
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
    />
  );
}
