"use client";

import { useState, useRef } from "react";
import styles from "./PhotosSection.module.css";

export default function PhotosSection() {
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const files = fileRef.current?.files;
    if (!files?.length || !name.trim()) return;

    setUploading(true);
    setMessage("");

    let uploaded = 0;
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("name", name.trim());

      try {
        await fetch("/api/photos", { method: "POST", body: formData });
        uploaded++;
      } catch {
        // continue with remaining files
      }
    }

    setMessage(`${uploaded} photo${uploaded !== 1 ? "s" : ""} uploaded — thank you!`);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    setFileCount(0);
  }

  return (
    <section className={styles.photos}>
      <h2 className={styles.heading}>Photos</h2>
      <p className={styles.subtitle}>
        Share your favorite photos of or with us from over the years and we&rsquo;ll put our favorites up here. Feel free to share one, two, or 20 &mdash; of just Jess, just Jake, or any combination of you and us.
      </p>

      <div className={styles.formWrap}>
        <input
          className={styles.input}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={styles.fileLabel}>
          <span className={styles.fileLabelText}>
            {fileCount
              ? `${fileCount} photo${fileCount !== 1 ? "s" : ""} selected`
              : "Choose photos"}
          </span>
          <input
            ref={fileRef}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            multiple
            onChange={() => {
              setFileCount(fileRef.current?.files?.length || 0);
              setMessage("");
            }}
          />
        </label>
        <button
          className={styles.button}
          onClick={handleUpload}
          disabled={uploading || !name.trim() || !fileCount}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className={styles.success}>{message}</p>}
      </div>
    </section>
  );
}
