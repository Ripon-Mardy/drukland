import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <>
    <footer className='container mx-auto px-2 pb-3'>
      <div className='my-4'>
      <hr />
      </div>
        <div className='flex flex-col md:flex-row items-center justify-between text-sm'>
           <h2>All rights reserved © 2024  |  Drukland.de</h2>
           <div className='flex items-center justify-center gap-5'>
            <Link href={'#'}>Terms of Use</Link>
            <Link href={'#'}>Sitemap</Link>
            <Link href={'#'}>Company information</Link>
            <Link href={'#'}>Cookie settings</Link>
           </div>
        </div>
    </footer>
    </>
  )
}

export default Footer
