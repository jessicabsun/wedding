"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_NAME, isValidPassword } from "@/lib/permissions";
import Nav from "./Nav";
import styles from "./ProtectedPage.module.css";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] ?? "";

    if (isValidPassword(value)) {
      setAuthorized(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>—</span>
      </div>
    );
  }

  return (
    <>
      <Nav />
      {children}
    </>
  );
}
