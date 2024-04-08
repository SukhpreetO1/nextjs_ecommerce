"use client";
import { ADMIN_ADD_CATEGORY_TYPES, ADMIN_DASHBOARD, FontAwesomeIcon, Link, faPenToSquare, faPlusSquare, faTrashCan } from "@/app/api/routes/route";
import { MONGODB_CATEGORY_TYPES } from '@/app/api/mongodb_api/route';
import React, { useEffect, useState } from 'react'

const CategoryHeading = () => {
  const [categoryTypes, setCategoryTypes] = useState();
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    const fetchCategoryHeading = async () => {
      const response = await fetch(MONGODB_CATEGORY_TYPES);
      const categoryTypesData = await response.json();
      setCategoryTypes(categoryTypesData.category_types);

      const initialCheckedState = categoryTypesData.category_types.map(category_type => category_type.status === 1);
      setIsChecked(initialCheckedState);
    }
    fetchCategoryHeading();
  }, [])
  return (
    <>
      <div className='category_types_page sm:ml-60'>
        <div className="category_types_title">
          <h1 className='text-5xl font-bold leading-loose text-center py-3'>Category Types</h1>
        </div>
        <div className="category_types_data">

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
                      <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Category Types</span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="add_category_heading_option text-end sm:mr-16 mr-4 mb-4 sm:w-0 w-full">
              <Link href={ADMIN_ADD_CATEGORY_TYPES}><FontAwesomeIcon icon={faPlusSquare} className='text-4xl plus_icon hover:text-blue-700' /></Link>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 border-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-gray-600 uppercase border-b-2">
                <tr>
                  <th className="px-6 py-4 whitespace-pre">Name</th>
                  <th className="px-6 py-4 whitespace-pre">Category Heading</th>
                  <th className="px-6 py-4 whitespace-pre">Status</th>
                  <th className="px-6 py-4 whitespace-pre">Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryTypes && categoryTypes.length > 0 ? (
                  categoryTypes.map((category_types, index) => (
                    <tr key={category_types?.id || index} className="text-gray-600">
                      <td className="px-6 py-4 whitespace-pre">{category_types?.name || "-"}</td>
                      <td className="px-6 py-4 whitespace-pre">{category_types?.category_heading_id.name || "-"}</td>
                      <td className="px-6 py-4 whitespace-pre">{category_types?.status === 1 ? "Active" : "Inactive" || "-"}</td>
                      <td className="flex items-center px-6 py-4">
                        <Link href="#" className="text-blue-700 mr-2 user_edit_option"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                        <Link href="#" className="text-red-600 mr-2 user_delete_option"><FontAwesomeIcon icon={faTrashCan} /></Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-600">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryHeading
