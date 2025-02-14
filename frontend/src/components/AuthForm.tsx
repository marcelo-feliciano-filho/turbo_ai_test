import Image from "next/image";

export default function AuthForm({ title, mascot, onSubmit, email, setEmail, password, setPassword, buttonText, altText, onAltClick }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#FAF1E3] font-[Inter]">
      <Image src={mascot} alt="Mascot" width={95} height={113} className="mb-6" />
      <h1 className="text-[48px] font-[Inria Serif] font-bold text-[#957139] leading-[57.55px] mb-8">{title}</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-[420px]">
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
          {buttonText}
        </button>
      </form>
      <p className="text-[12px] text-[#957139] mt-6 cursor-pointer hover:underline leading-[14.52px]" onClick={onAltClick}>
        {altText}
      </p>
    </div>
  );
}
