import React from 'react';
import Image from 'next/image';  

const Register = () => {
  return (
    <div className='flex h-screen'>
      <section className='overflow-y-auto w-full'>
        <div className='max-w-[860px] flex flex-col py-10 mx-auto'>
          <Image 
            src='/assets/icons/medicare-high-resolution-logo-transparent.png' 
            height={1000}
            width={1000}
            alt='Medicare Logo'
            className='mb-12 h-10 w-fit'
          />
        </div>
      </section>
    </div>
  );
}

export default Register;