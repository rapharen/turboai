"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useAuthApi from '@/hooks/useAuthApi';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuthApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(username, password);
      router.push('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-xs">
        <div className="relative w-[140px] h-[140px]">
          <Image
            src="/assets/login-cactus.png"
            alt="A cute cactus in a pot, welcoming the user back"
            fill
            sizes="140px"
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-4xl font-serif text-[--color-foreground]">
          Yay, You're Back!
        </h1>

        <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col gap-4">
          <Input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" className="w-full">Login</Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <a href="/signup" className="text-sm text-[--color-link] underline mt-2">
          Oops! I've never been here before
        </a>
      </div>
    </main>
  );
}
