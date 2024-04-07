"use client";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon, Link, faPenToSquare, faTrashCan, faPlusSquare, ADMIN_ADD_CATEGORY_HEADING, ADMIN_EDIT_CATEGORY_HEADING, toast, axios } from "@/app/api/routes/route";
import { MONGODB_CATEGORY_HEADING } from '@/app/api/mongodb_api/route';

const CategoryHeading = () => {
  const [categoryHeading, setCategoryheading] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(MONGODB_CATEGORY_HEADING);
      const categoryHeadingData = await response.json();
      setCategoryheading(categoryHeadingData.category_heading);

      const initialCheckedState = categoryHeadingData.category_heading.map(category_heading => category_heading.status === 1);
      setIsChecked(initialCheckedState);
    };
    fetchData();
  }, []);

  const deleteCategoryHeader = async (category_heading_id) => {
    const confirmation = confirm("Are you sure you want to delete this category header?");
    if (confirmation === true) {
      const response = await fetch(MONGODB_CATEGORY_HEADING + '/' + category_heading_id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok === true) {
        const updatedCategoryHeading = categoryHeading.filter(item => item._id !== category_heading_id);
        setCategoryheading(updatedCategoryHeading);
        toast.success("Category Header deleted successfully");
      } else {
        console.log(error);
      }
    }
  }

  const handleCheckboxChange = async (e, category_heading_id) => {
    const status_value = e.target.checked ? 1 : 2;
    setIsChecked(e.target.checked);
    try {
      const response = await axios.put(MONGODB_CATEGORY_HEADING + "/" + category_heading_id, { status: status_value });
      const updatedCategoryHeadingData = response.data.category_heading;

      setCategoryheading(prevCategoryHeading => {
        return prevCategoryHeading.map(category_heading => {
          if (category_heading._id === category_heading_id) {
            const updatedStatus = updatedCategoryHeadingData.status === 1 ? 2 : 1;
            return { ...updatedCategoryHeadingData, status: updatedStatus };
          } else {
            return category_heading;
          }
        });
      });

      toast.success("Status updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status.");
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
                    <tr key={index} className="text-gray-600 border-b-2 border-gray-200">
                      <td className="px-6 py-4 whitespace-pre">{category_heading?.name || "-"}</td>
                      <td className="px-6 py-4 whitespace-pre">{category_heading?.status === 1 ? "Active" : "Inactive" || "-"}</td>
                      <td className="flex items-center px-6 py-2">
                        <Link href={`${ADMIN_EDIT_CATEGORY_HEADING}/${category_heading?._id}`} className="text-blue-700 mr-2 user_edit_option"><FontAwesomeIcon icon={faPenToSquare} title='Edit Category Header' /></Link>
                        <Link href="#" className="text-red-600 mr-2 user_delete_option" onClick={() => deleteCategoryHeader(category_heading?._id)}><FontAwesomeIcon icon={faTrashCan} title='Delete Category Header' /></Link>
                        <div className="toggle_buttom">
                          <label className="inline-flex items-center mb-5 cursor-pointer">
                            <input type="checkbox" value={category_heading.status} className="sr-only peer" checked={isChecked[index]} onChange={(e) => handleCheckboxChange(e, category_heading._id)} />
                            <div className="relative top-3 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "> </div>
                          </label>
                        </div>
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