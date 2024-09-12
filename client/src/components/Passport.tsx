import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PassportProps {
  file: string;
}

const Passport: React.FC<PassportProps> = ({ file }) => {
  const {
    data: imageUrl,
    error,
    isLoading,
  } = useSWR(`http://localhost:3001/files/${file}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading image</div>;

  return (
    <div className="passport-container">
      <h1>{file}</h1>
      {imageUrl && <img src={imageUrl} alt={file} className="passport-image" />}
    </div>
  );
};

export default Passport;
