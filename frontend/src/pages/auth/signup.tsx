import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        username: email,  // Ensure backend expects this field
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token
        router.push('/'); // Redirect to home page
      } else {
        setError('Signup failed: No token received.');
      }
    } catch (error) {
      if (error.response) {
        // If user is already registered, log them in instead
        if (error.response.status === 400 && error.response.data.username) {
          try {
            const loginResponse = await axios.post('http://localhost:8000/api/auth/login', {
              email,
              password,
            });

            if (loginResponse.data.token) {
              localStorage.setItem('token', loginResponse.data.token);
              router.push('/');
            } else {
              setError('Login failed: No token received.');
            }
          } catch (loginError) {
            setError('Login failed. Please check your credentials.');
          }
        } else {
          setError(error.response.data.message || 'Signup failed. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#FAF1E3] font-[Inter]">
      <Image src="/cat.png" alt="Signup Mascot" width={200} height={140} className="mb-6" />
      <h1 className="text-[48px] font-[Inria Serif] font-bold text-[#957139] leading-[57.55px] mb-8">
        Yay, New Friend!
      </h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-5 w-[420px]">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-[12px] w-full p-4 border border-[#88642A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88642A] text-lg bg-[#FAF1E3] placeholder-[#000000]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-[12px] w-full p-4 border border-[#88642A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88642A] text-lg bg-[#FAF1E3] placeholder-[#000000]"
          required
        />
        <button
          type="submit"
          className="text-[16px] w-full bg-[#FAF1E3] border-2 border-[#88642A] px-6 py-4 rounded-full text-[#957139] hover:bg-[#D6C7B9] text-xl font-semibold shadow-md"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      <p
        className="text-[12px] text-[#957139] mt-6 cursor-pointer hover:underline leading-[14.52px]"
        onClick={() => router.push('/auth/login')}
      >
        We&apos;re already friends!
      </p>
    </div>
  );
}
