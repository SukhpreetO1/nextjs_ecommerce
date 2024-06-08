"use client";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon, Link, faShoppingBag, faHeart, faUser, MONGODB_CATEGORY_HEADING, Image, LOGIN_URL, FORGOT_PASSWORD, SIGNUP_URL, usePathname, HOME_URL } from "@/app/api/routes/route";

const Navbar = () => {
  const currentPath = usePathname();
  const [categoryHeader, setCategoryHeader] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(MONGODB_CATEGORY_HEADING);
      const data = await response.json();
      setCategoryHeader(data.category_heading);
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className="bg-white border-white dark:bg-white fixed top-0 w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-16">
          <Link href={HOME_URL} className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="https://flowbite.com/docs/images/logo.svg" className="h-8 w-auto" width={0} height={0} alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <div className='hidden lg:block'>
              <button type="button" data-collapse-toggle="navbar_search" aria-controls="navbar_search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-400 rounded-lg text-sm p-2.5 me-1">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
            </div>
            <div className="relative hidden xl:block mx-9" style={{width: "36vw"}}>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-black border border-gray-100 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-800 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <div>
              <button data-collapse-toggle="navbar_search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-800 dark:hover:bg-gray-200 dark:focus:ring-gray-500" aria-controls="navbar-search" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div className='hidden w-full md:block md:w-auto mt-1'>
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
                  {currentPath === LOGIN_URL || currentPath === FORGOT_PASSWORD || currentPath === SIGNUP_URL ? '' : 
                    <li className={`profile_dropdown relative ${isDropdownOpen == true ? 'border-b-4 border-b-red-500 h-12 -mb-4 w-10' : ''}`} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}><div className="py-2 px-3 text-black rounded hover:bg-white md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white hover:cursor-pointer dark:hover:text-white grid gap-1 justify-items-center" ><FontAwesomeIcon icon={faUser} /><span className='text-xs'>Profile</span></div>
                    {isDropdownOpen && (
                      <div className="absolute w-72 -right-28 top-12 border-2 border-solid border-gray-100 p-3 bg-gray-50 rounded shadow-md">
                        <div className='p-3'>
                          <p className='font-bold py-1'>Welcome</p>
                          <p className='font-light text-sm py-1'>To access account and manage orders</p>
                          <p className='py-1 my-2 border-2 border-gray-200 text-center text-pink-500 uppercase font-bold'><Link href={LOGIN_URL} className='redirect_login_page text-sm'>Login/ Signup</Link></p>                       
                        </div>
                        <hr />
                        <div className='p-3'>
                          <p className='font-light text-sm py-1'>Orders</p>
                          <p className='font-light text-sm py-1'>Wishlist</p>
                          <p className='font-light text-sm py-1'>Gift Cards</p>
                          <p className='font-light text-sm py-1'>Contact Us</p>
                        </div>
                        <hr />
                        <div className='p-3'>
                          <p className='font-light text-sm py-1'>Myntra Credit</p>
                          <p className='font-light text-sm py-1'>Coupons</p>
                          <p className='font-light text-sm py-1'>Saved Cards</p>
                          <p className='font-light text-sm py-1'>Saved VPA</p>
                          <p className='font-light text-sm py-1'>Saved Addresses</p>
                        </div>
                      </div>
                    )}
                    </li>
                  }
                  <li className=''><Link href="#" className="py-2 px-3 text-black rounded hover:bg-black  md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white dark:hover:text-white dark:border-gray-700 grid gap-1 justify-items-center"><FontAwesomeIcon icon={faHeart} /><span className='text-xs'>Wishlist</span></Link></li>
                  <li className=''><Link href="#" className="py-2 px-3 text-black rounded hover:bg-black md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-white dark:hover:text-white dark:border-gray-700 grid gap-1 justify-items-center"><FontAwesomeIcon icon={faShoppingBag} /><span className='text-xs'>Bag</span></Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="items-center justify-between hidden md:flex md:order-1 lg:w-1/3 w-3/5" id="categories_data">
            {categoryHeader && categoryHeader.map((category_header, index) => (
              category_header.status === 1 && (
                <ul key={index} className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
                  <li><Link href="#" className="block py-2 px-3 text-black hover:bg-white md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-white dark:hover:text-white dark:border-white w-fit uppercase text-center text-xs">{category_header.name}</Link></li>
                </ul>
              )
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar