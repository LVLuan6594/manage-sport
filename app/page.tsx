'use client'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Ưu tiên kiểm tra đăng nhập khách vãng lai
    if (typeof window !== 'undefined' && localStorage.getItem('guest_phone')) {
      router.push('/xet-tuyen');
      return;
    }
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return null;
}
