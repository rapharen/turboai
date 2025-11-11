import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-xs">
        <Image
          src="/assets/signup-cat.png"
          alt="A cute cat lying down, welcoming a new user"
          width={150}
          height={100}
          priority
        />

        <h1 className="text-4xl font-serif text-[--color-foreground]">
          Yay, New Friend!
        </h1>

        <form className="mt-4 flex w-full flex-col gap-4">
          <Input type="email" placeholder="Email address" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>

        <a href="/" className="text-sm text-[--color-link] underline mt-2">
          We're already friends!
        </a>
      </div>
    </main>
  );
}
