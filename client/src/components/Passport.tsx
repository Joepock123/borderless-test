import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PassportProps {
  file: string;
}

const Passport: React.FC<PassportProps> = ({ file }) => {
  const { data, error, isLoading } = useSWR<{
    url: string;
    dob?: string;
    expiryDate?: string;
  }>(`http://localhost:3001/files/${file}`, fetcher, {
    revalidateOnFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading image</div>;

  return (
    <div className="passport-container">
      <p>File: {file}</p>
      {data?.dob && <p>DOB: {data.dob}</p>}
      {data?.expiryDate && <p>Expiry: {data.expiryDate}</p>}
      {data?.url && !data?.dob && !data?.expiryDate && (
        <p>Could not extract data from file. Please try another upload.</p>
      )}
      {data?.url && (
        <img src={data.url} alt={file} className="passport-image" />
      )}
    </div>
  );
};

export default Passport;
