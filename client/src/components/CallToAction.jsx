// import React from 'react'
import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to learn more about Javascript ?</h2>
        <p className='text-gray-500 my-2'>
          Checkout these resources with 100 Javascript Projects
        </p>
        <Button
          gradientDuoTone={'purpleToPink'}
          className='rounded-tl-xl rounded-bl-none'>
          <a
            href='https://www.google.com'
            target='_blank'
            rel='noopener noreferrer'>
            Learn More
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://firebasestorage.googleapis.com/v0/b/iamkoushik1999-mern-blog.appspot.com/o/freepik-javascript.jpg?alt=media&token=69e96e79-56db-4a44-bb10-e24e83bbc075' />
      </div>
    </div>
  );
};

export default CallToAction;
