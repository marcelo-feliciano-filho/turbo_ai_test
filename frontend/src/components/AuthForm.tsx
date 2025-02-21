import Image from "next/image";

interface AuthFormProps {
  title: string;
  mascot: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  buttonText: string;
  altText: string;
  onAltClick: () => void;
  error?: string | null;
}

export default function AuthForm({
  title,
  mascot,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  buttonText,
  altText,
  onAltClick,
  error,
}: AuthFormProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#FAF1E3] font-[Inter]">
      <Image src={mascot} alt="Mascot" width={188} height={134} className="mb-6" priority />
      <h1 className="text-[48px] font-[Inria Serif] font-bold text-[#957139] leading-[57.55px] mb-8">{title}</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-[420px]">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border border-[#88642A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88642A] text-lg bg-[#FAF1E3] placeholder-[#000000]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border border-[#88642A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88642A] text-lg bg-[#FAF1E3] placeholder-[#000000]"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#FAF1E3] border-2 border-[#88642A] px-6 py-4 rounded-full text-[#957139] hover:bg-[#D6C7B9] text-xl font-semibold shadow-md"
        >
          {buttonText}
        </button>
      </form>
      <p className="text-[#957139] mt-6 cursor-pointer hover:underline" onClick={onAltClick}>
        {altText}
      </p>
    </div>
  );
}
