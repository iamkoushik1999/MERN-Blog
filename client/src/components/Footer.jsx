/* eslint-disable react/no-unescaped-entities */
// import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsTwitterX, BsGlobe2, BsTelegram, BsGithub } from 'react-icons/bs';

const FooterComp = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to={'/'}
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Koushik's
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            {/* About Section*/}
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup>
                <Footer.Link
                  href='https://iamkoushik1999.netlify.app/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href='https://linktr.ee/iamkoushik1999'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Linktr.ee
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Follow Section*/}
            <div>
              <Footer.Title title='Follow Me' />
              <Footer.LinkGroup>
                <Footer.Link
                  href='https://www.linkedin.com/in/koushikdutta/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Linked In
                </Footer.Link>
                <Footer.Link
                  href='https://github.com/iamkoushik1999'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Legal Section */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by='Koushik Dutta'
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon
              href='https://twitter.com/iamkoushik1999'
              icon={BsTwitterX}
            />
            <Footer.Icon
              href='https://iamkoushik1999.wixsite.com/iamkoushik1999'
              icon={BsGlobe2}
            />
            <Footer.Icon href='https://t.me/iamkoushik1999' icon={BsTelegram} />
            <Footer.Icon
              href='https://github.com/iamkoushik1999'
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
