// import React from 'react'
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInfailure,
} from '../redux/user/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      dispatch(signInStart());
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // console.log(resultsFromGoogle);
      const res = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInfailure(data.message));
      }
      if (data.success === true) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      signInfailure(error.message);
    }
  };

  return (
    <Button
      type='button'
      gradientDuoTone={'pinkToOrange'}
      outline
      onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  );
};

export default OAuth;
