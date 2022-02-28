import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../../hooks/use-auth';
import Breadcrumb from '../../../components/Breadcrumb';

const Profile = () => {
  const auth = useAuth();
  const [diploma, setDiploma] = useState(null);

  const uid = auth.state && auth.state.uid;
  const displayName = auth.state && auth.state.displayName;
  const photoURL = auth.state && auth.state.photoURL;

  useEffect(() => {
    const axiosToken = axios.CancelToken.source();

    const fetchDiploma = async () => {
      try {
        const token = auth.state && auth.state.accessToken;
        const uid = auth.state && auth.state.uid;

        const res = await axios.post(`/api/get/${uid}`, null, {
          headers: { Authorization: 'Bearer ' + token },
          cancelToken: axiosToken.token
        });

        if (res.data.data.length > 0) {
          setDiploma(res.data.data[0].cid);
        }
      } catch (error) {}
    };
    fetchDiploma();

    return () => {
      axiosToken.cancel();
    };
  }, [auth]);

  return (
    <>
      <Breadcrumb links={[{ text: 'Profile', link: '/' }]} />

      <div className="flex xl:flex-row flex-col xl:space-x-6 xl:space-y-0 space-x-0 space-y-4 mt-4">
        <div className="bg-white rounded-md p-5 pt-3">
          <h1 className="text-2xl mb-6">Biodata</h1>
          <div className="flex sm:flex-row flex-col sm:space-x-4 space-x-0 sm:space-y-0 space-y-6">
            <div className="flex flex-col justify-center items-center space-y-4">
              <img
                className="h-40 w-36"
                referrerPolicy="no-referrer"
                src={photoURL}
                alt={displayName}
              />
              <button className="bg-green-500 text-white rounded-md w-36 px-3 py-2">
                Upload Photo
              </button>
            </div>

            <table>
              <tbody>
                <tr>
                  <th className="pr-2 text-left w-12">Name</th>
                  <td>:</td>
                  <td>{displayName}</td>
                </tr>
                <tr>
                  <th className="pr-2 text-left">UID</th>
                  <td>:</td>
                  <td>{uid}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {diploma && (
          <div className="bg-white rounded-md p-5 pt-3">
            <h1 className="text-2xl mb-6">Assets</h1>
            <div className="flex flex-row sm:justify-start justify-center">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://ipfs.io/ipfs/${assets}`}
              >
                <img
                  className="h-52"
                  src={`https://ipfs.io/ipfs/${assets}`}
                  alt="img"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
