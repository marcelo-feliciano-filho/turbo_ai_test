import Button from '../../components/Button';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-body">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <img src="/cactus.png" alt="Login Mascot" className="w-20 mx-auto" />
        <input type="email" placeholder="Email" className="w-full mt-4 p-2 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full mt-2 p-2 border rounded-md" />
        <Button label="Login" onClick={() => {}} />
      </div>
    </div>
  );
}
