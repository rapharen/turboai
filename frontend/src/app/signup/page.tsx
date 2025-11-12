"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useAuthApi from '@/hooks/useAuthApi';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { registerUser } = useAuthApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(username, password);
      router.push('/');
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-xs">
        <div className="relative w-[140px] h-[140px]">
          <Image
            src="/assets/signup-cat.png"
            alt="A cute cat lying down, welcoming a new user"
            fill
            sizes="140px"
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-4xl font-serif text-[--color-foreground]">
          Yay, New Friend!
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
          <Button type="submit" className="w-full">Sign Up</Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <a href="/" className="text-sm text-[--color-link] underline mt-2">
          We're already friends!
        </a>
      </div>
    </main>
  );
}
