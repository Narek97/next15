'use client';

import React, { FormEvent } from 'react';
import { signIn, SignInResponse } from 'next-auth/react';

interface FormData {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const submitHandler = async (data: FormData) => {
    const resData: SignInResponse | undefined = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!resData) {
      console.error('No response from server.');
      alert('No response from server.');
      return;
    }

    if (resData.status === 400 || resData.status === 401 || resData.status === 403) {
      console.log('Invalid Credentials!');
      alert('Invalid Credentials!');
    } else if (resData.status === 500) {
      console.log('Server error!');
      alert('Server error!');
    } else {
      console.log(resData);
    }
  };

  const credentials = {
    email: 'test@example.com',
    password: 'yourPassword123',
  };

  // Create the request body as JSON
  const requestBody = JSON.stringify(credentials);

  // Make the POST request using fetch
  const click = async () => {
    await signIn('mywebpage', {
      callbackUrl: 'http://localhost:3000',
      redirect: true,
      json: true,
    });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Login</p>
        <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>
          Sign in with Google
        </button>
        <button
          className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
          onClick={() => signIn('github')}>
          Sign in with GitHub
        </button>
        <button
          className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
          onClick={() => {
            const oauthUrl = `https://www.questionpro.com/a/oauth/authorize/?state=null&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/callback/mywebpage')}&response_type=code&client_id=wyfbfmkwaxjaelytosyy`;
            window.location.href = oauthUrl;
          }}>
          Sign in with MyWebpageProvider
        </button>
        <button
          onClick={() => {
            signIn('mywebpage', {
              callbackUrl: 'http://localhost:3000/after-login', // After-login redirect URL
            });
          }}>
          Click
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                username: { value: string };
                password: { value: string };
              };
              submitHandler({
                email: target.username.value,
                password: target.password.value,
              });
            }}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
          <button onClick={click}>click</button>
        </div>
      </div>
    </>
  );
};

export default Page;
