import React, { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';

import { useAuth } from '../../../hooks/use-auth';
import Breadcrumb from '../../../components/Breadcrumb';

const Validate = () => {
  const auth = useAuth();
  const [name, setName] = useState('');
  const [NIM, setNIM] = useState('');
  const [file, setFile] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [axiosToken, setAxiosToken] = useState(null);

  const onNameChange = (e) => {
    const name = e.target.value;
    if (name) {
      setName(name);
    } else {
      setName('');
    }
  };

  const onNIMChange = (e) => {
    const NIM = e.target.value;
    if (NIM) {
      setNIM(NIM);
    } else {
      setNIM('');
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    } else {
      setFile('');
    }
  };

  const onFileSubmit = async () => {
    try {
      setIsValidating(true);

      if (!name) {
        alert('Please input name');
        return;
      }

      if (!NIM) {
        alert('Please input NIM');
        return;
      }

      if (!file) {
        alert('Please input file');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('NIM', NIM);
      formData.append('file', file);

      const token = auth.state && auth.state.accessToken;
      const APIAddress = '/api/validate';
      const res = await axios.post(APIAddress, formData, {
        headers: { Authorization: 'Bearer ' + token },
        cancelToken: axiosToken.token
      });

      if (res.data.data) {
        setIsValidating(true);
      } else {
        setIsValidating(false);
      }

      console.log(res.data);
      alert('Contract created');
      alert(res.data.message);
    } catch (error) {
      if (axios.isCancel(error)) return;

      if (error.response) {
        console.log(error.response.data);
        alert('Error: ' + error.response.data.message);
      } else {
        console.log(error);
        console.log(error.message);
        alert('Error: ' + error.message);
      }
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const uid = auth.state && auth.state.uid;
    const displayName = auth.state && auth.state.displayName;
    if (uid) setNIM(uid);
    if (displayName) setName(displayName);

    const axiosToken = axios.CancelToken.source();
    setAxiosToken(axiosToken);

    return () => {
      axiosToken.cancel();
    };
  }, [auth]);

  const validateButtonClass = isValidating
    ? 'flex flex-row justify-center items-center bg-gray-300 text-gray-700 rounded-md space-x-1 px-3 py-2 w-full cursor-wait'
    : 'block bg-green-500 text-white rounded-md px-3 py-2 w-full';

  return (
    <>
      <Breadcrumb links={[{ text: 'Validate', link: '/validate' }]} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-4">
        <div className="flex flex-col justify-center items-center bg-white p-3 rounded-md">
          <form className="w-full">
            <label className="space-y-1 block mb-4">
              <p>Name</p>
              <input
                onChange={(e) => onNameChange(e)}
                className="bg-gray-100 rounded-md px-3 w-full py-2"
                disabled
                type="text"
                value={name}
              />
            </label>
            <label className="space-y-1 block mb-4">
              <p>UID</p>
              <input
                onChange={(e) => onNIMChange(e)}
                className="bg-gray-100 rounded-md w-full px-3 py-2"
                disabled
                type="text"
                value={NIM}
              />
            </label>
            <label className="space-y-1 block mb-6">
              <p>Diploma</p>
              <input
                onChange={(e) => onFileChange(e)}
                disabled={isValidating}
                type="file"
              />
            </label>
          </form>
          <button
            onClick={onFileSubmit}
            disabled={isValidating}
            className={validateButtonClass}
          >
            {isValidating ? (
              <>
                <BounceLoader color="gray" size={20} />
                <span>Validating..</span>
              </>
            ) : (
              'Validate'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Validate;
