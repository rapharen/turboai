import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-xs">
        <Image
          src="/assets/login-cactus.png"
          alt="A cute cactus in a pot, welcoming the user back"
          width={140}
          height={140}
          priority
        />

        <h1 className="text-4xl font-serif text-[--color-foreground]">
          Yay, You're Back!
        </h1>

        <form className="mt-4 flex w-full flex-col gap-4">
          <Input type="email" placeholder="Email address" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full">Login</Button>
        </form>

        <a href="/signup" className="text-sm text-[--color-link] underline mt-2">
          Oops! I've never been here before
        </a>
      </div>
    </main>
  );
}
