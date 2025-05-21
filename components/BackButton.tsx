// components/BackButton.tsx
'use client'; // This directive makes it a Client Component

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react'; // Assuming you have lucide-react installed

interface BackButtonProps {
  text?: string;
  className?: string;
}

export default function BackButton({ text = 'Back', className = '' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Uses router.back() for navigation history
      className={`inline-flex items-center text-blue-600 hover:text-blue-700 group ${className}`}
    >
      <ChevronLeft size={22} className="mr-1 transition-transform group-hover:-translate-x-1" />
      <span className="font-medium">{text}</span>
    </button>
  );
}