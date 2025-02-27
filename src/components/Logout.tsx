// components/Logout.tsx
"use client";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button type="default" onClick={handleLogout}>
      Logout
    </Button>
  );
}