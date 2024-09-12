import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

import "../styles/UploadForm.css";

const sendFile = async (url: string, { arg }: { arg: FormData }) => {
  const res = await fetch(url, {
    method: "POST",
    body: arg,
  });
  if (!res.ok) {
    throw new Error("File upload failed");
  }
  return res.json();
};

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3001/files",
    sendFile
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await trigger(formData);
      mutate("http://localhost:3001/files");
    } catch (error) {
      console.error(error);
    }

    setFile(null);
  };

  return (
    <div className="upload-form-container">
      <h3>Upload a File</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={isMutating}>
          {isMutating ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
