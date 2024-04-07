"use client";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon, Link, faPenToSquare, faTrashCan, faPlusSquare, ADMIN_ADD_CATEGORY_HEADING, ADMIN_EDIT_CATEGORY_HEADING, toast } from "@/app/api/routes/route";
import { MONGODB_CATEGORY_HEADING } from '@/app/api/mongodb_api/route';

const CategoryHeading = () => {
  const [categoryHeading, setCategoryheading] = useState([]);

  useEffect(() => {
    const fetchCategoryHeading = async () => {
      const response = await fetch(MONGODB_CATEGORY_HEADING);
      const categoryHeadingData = await response.json();
      setCategoryheading(categoryHeadingData.category_heading);
    }
    fetchCategoryHeading();
  }, [])

  const deleteCategoryHeader = async (category_heading_id) => {
    const confirmation = confirm("Are you sure you want to delete this category header?");
    if (confirmation === true){
      const response = await fetch(MONGODB_CATEGORY_HEADING + '/' + category_heading_id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok === true) {
        toast.success("Category Header deleted successfully");
        const updatedCategoryHeading = categoryHeading.filter(item => item._id !== category_heading_id);
        setCategoryheading(updatedCategoryHeading);
      } else {
        console.log(error);
      }
    } 
  }

  return (
    <>
      <div className='category_heading_page sm:ml-60'>
        <div className="category_heading_title">
          <h1 className='text-5xl font-bold leading-loose text-center py-3'>Category Heading</h1>
        </div>
        <div className="category_heading_data">
          <div className="add_category_heading_option text-end mr-12 mb-4">
            <Link href={ADMIN_ADD_CATEGORY_HEADING}><FontAwesomeIcon icon={faPlusSquare} className='text-4xl plus_icon hover:text-blue-700' /></Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 border-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-gray-600 uppercase border-b-2">
                <tr>
                  <th className="px-6 py-4 whitespace-pre">Name</th>
                  <th className="px-6 py-4 whitespace-pre">Status</th>
                  <th className="px-6 py-4 whitespace-pre">Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryHeading && categoryHeading.length > 0 ? (
                  categoryHeading?.map((category_heading, index) => (
                    <tr key={index} className="text-gray-600">
                      <td className="px-6 py-4 whitespace-pre">{category_heading?.name || "-"}</td>
                      <td className="px-6 py-4 whitespace-pre">{category_heading?.status === 1 ? "Active" : "Inactive" || "-"}</td>
                      <td className="flex items-center px-6 py-4">
                        <Link href={`${ADMIN_EDIT_CATEGORY_HEADING}/${category_heading?._id}`} className="text-blue-700 mr-2 user_edit_option"><FontAwesomeIcon icon={faPenToSquare} title='Edit Category Header'/></Link>
                        <Link href="#" className="text-red-600 mr-2 user_delete_option" onClick={() => deleteCategoryHeader(category_heading?._id)}><FontAwesomeIcon icon={faTrashCan} title='Delete Category Header'/></Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-data">
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-600">No data found</td>
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