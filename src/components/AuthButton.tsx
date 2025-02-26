// components/AuthButton.tsx
'use client';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const provider = new GoogleAuthProvider();

export default function AuthButton() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirect to a protected page
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {auth.currentUser ? (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in with Google
        </button>
      )}
    </div>
  );
}