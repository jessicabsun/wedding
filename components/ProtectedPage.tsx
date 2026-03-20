"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_NAME, isValidPassword, canAccess, type Page } from "@/lib/permissions";
import styles from "./ProtectedPage.module.css";

interface Props {
  page: Page;
  children: React.ReactNode;
}

export default function ProtectedPage({ page, children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] ?? "";

    if (isValidPassword(value) && canAccess(value, page)) {
      setAuthorized(true);
    } else {
      router.replace("/");
    }
  }, [page, router]);

  if (!authorized) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>—</span>
      </div>
    );
  }

  return <>{children}</>;
}
