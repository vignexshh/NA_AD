// components/SignIn.tsx
"use client";
import { Button } from "antd";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Button type="primary" onClick={handleSignIn}>
      Sign In with Google
    </Button>
  );
}