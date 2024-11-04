"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { verifySession } from '@/api/auth';

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "") {
      const checkLoginStatus = async () => {
        try {
          const loggedInStatus = await verifySession();
          if (loggedInStatus === 401) {
            localStorage.removeItem("isLoggedIn");
            router.replace('/login');
          } else {
            router.replace('/home');
          }
        } catch (error) {
          console.log("There was an error verifying your session:", error);
          router.replace('/login');
        }
      };

      checkLoginStatus();
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null;
}
