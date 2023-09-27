import axios from 'axios';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [signedUrl, setSignedUrl] = useState('');
  const [file, setFile] = useState<File>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getSignedUrl = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/get-signed-url'
      );

      setSignedUrl(response.data.url);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const getURL = async () => {
      await getSignedUrl();
    };
    getURL();
  }, []);

  useEffect(() => {
    const uploadFile = async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        await axios.put(signedUrl, file, options);
        console.log('File uploaded successfully');
        setSignedUrl(signedUrl.split('?')[0]);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    if (file) {
      uploadFile();
    }
  }, [file, signedUrl]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/register',
        {
          name,
          email,
          password,
          profilePicture: signedUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      navigate('/signin');
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
            />
            {!file ? (
              <>
                <button
                  className="px-3 py-1 bg-blue-500 rounded-md text-white font-semibold shadow-md shadow-gray-600"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  upload
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  Upload your profile picture
                </p>
              </>
            ) : (
              <img
                src={signedUrl}
                alt="profile"
                className="w-20 h-20 rounded-full mx-auto"
              />
            )}
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
