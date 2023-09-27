import axios from 'axios';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

function AddPost() {
  const [postContent, setPostContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [signedUrl, setSignedUrl] = useState('');
  const [file, setFile] = useState<File>();

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

  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/posts/create',
        {
          description: postContent,
          image: signedUrl.split('?')[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      // setPostContent('');
      // setSignedUrl('');
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handlePostSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <div className="">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files![0]);
                }}
              />
              <PhotoIcon
                className="h-6 hover:scale-110 cursor-pointer transition-all duration-300"
                onClick={() => fileInputRef.current?.click()}
              />
              {/* <Link to={`${signedUrl}`} target="_">
                <p className="truncate">{signedUrl}</p>
              </Link> */}
              {/* {file && <img src={signedUrl} alt="uploaded" />} */}
            </div>

            <button
              type="submit"
              className={`btn disabled:opacity-40 disabled:cursor-not-allowed`}
              disabled={!file}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
