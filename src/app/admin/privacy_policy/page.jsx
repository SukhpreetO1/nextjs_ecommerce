import React from 'react';
import { Link, ADMIN_DASHBOARD } from "@/app/api/routes/route";
import { MONGODB_CATEGORIES } from '@/app/api/mongodb_api/route';

const PrivacyPolicy = () => {
    return (
        <div className='privacy_policy_page sm:ml-60'>
            <div className="privacy_policy_title">
                <h1 className='text-5xl font-bold leading-loose text-center py-3'>Privacy Policy</h1>
            </div>
            <div className="privacy_policy_data">
                <div className='flex justify-between'>
                    <div className='admin_breadcrumbs hidden sm:block w-fit ml-4 -mt-2'>
                        <div className="flex px-5 py-3 text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:white" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link href={ADMIN_DASHBOARD} className="inline-flex items-center text-sm font-medium text-black hover:text-blue-600 dark:text-gray-600 dark:hover:text-blue-600">
                                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Privacy Policy</span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="privacy_policy_option text-end sm:mr-16 mr-4 mb-4 sm:w-0 w-full">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy