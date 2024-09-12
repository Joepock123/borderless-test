import React, { useState } from "react";
import useSWR from "swr";
import UploadForm from "./UploadForm";
import Passport from "./Passport";

import "../styles/PassportUpload.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PassportUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR<string[]>(
    "http://localhost:3001/files",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading files</div>;

  return (
    <>
      <div className="files-list-container">
        <h2 className="files-list-container__header">Files</h2>

        <UploadForm />

        <ul className="files-list">
          {data?.map((fileName) => (
            <li
              key={fileName}
              className="file-item"
              onClick={() => setSelectedFile(fileName)}
            >
              {fileName}
            </li>
          ))}
        </ul>
      </div>
      {selectedFile && <Passport file={selectedFile} />}
    </>
  );
};

export default PassportUpload;
