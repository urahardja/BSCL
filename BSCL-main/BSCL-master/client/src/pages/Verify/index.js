import React, { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';

import Navbar from './Navbar';

const Verify = () => {
  document.body.classList.toggle('bg-green-600', false);
  document.body.classList.toggle('bg-gray-100', true);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [axiosToken, setAxiosToken] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setIsValid(null);
    } else {
      setFile(null);
      setFileName(null);
      setIsValid(null);
    }
  };

  const onFileSubmit = async () => {
    try {
      setIsValid(null);
      setIsVerifying(true);

      if (!file) {
        alert('Please input file');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const APIAddress = '/api/verify';
      const res = await axios.post(APIAddress, formData, {
        cancelToken: axiosToken.token
      });

      if (res.data.data) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      console.log(res.data);
      alert(res.data.message);
    } catch (error) {
      if (axios.isCancel(error)) return;

      if (error.response) {
        console.log(error.response.data);
        alert('Error: ' + error.response.data.message);
      } else {
        console.log(error.message);
        alert('Error: ' + error.message);
      }

      setIsValid(null);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const axiosToken = axios.CancelToken.source();
    setAxiosToken(axiosToken);

    return () => {
      axiosToken.cancel();
    };
  }, []);

  const verifyButtonClass = isVerifying
    ? 'flex flex-row justify-center items-center bg-gray-300 text-gray-700 inline-block w-full rounded-md py-4 mt-4 space-x-1 cursor-wait'
    : 'bg-green-500 text-white inline-block w-full rounded-md py-4 mt-4';

  let fileInputLabelClass;
  if (isValid === null) {
    fileInputLabelClass =
      'bg-white ring ring-green-500 rounded-md inline-block w-full h-32';
  } else {
    fileInputLabelClass = isValid
      ? 'bg-green-200 ring ring-green-500 rounded-md inline-block w-full h-32'
      : 'bg-red-200 ring ring-red-500 rounded-md inline-block w-full h-32';
  }

  return (
    <>
      <Navbar />

      <div className=" flex flex-row justify-center">
        <div className="bg-white rounded-md p-5 w-96 shadow-sm">
          <form>
            <label className={fileInputLabelClass}>
              <p className="text-center truncate mt-12 px-3">
                {fileName || 'Click here to upload file'}
              </p>
              <input
                onChange={(e) => onFileChange(e)}
                className="hidden"
                disabled={isVerifying}
                type="file"
              />
            </label>
          </form>
          <button
            disabled={isVerifying}
            onClick={onFileSubmit}
            className={verifyButtonClass}
          >
            {isVerifying ? (
              <>
                <BounceLoader color="gray" size={20} />
                <span>Verifying..</span>
              </>
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Verify;
