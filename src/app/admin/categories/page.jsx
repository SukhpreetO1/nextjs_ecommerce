"use client";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon, Link, faPenToSquare, faTrashCan, faPlusSquare, ADMIN_ADD_CATEGORIES, ADMIN_EDIT_CATEGORIES, toast, axios, ADMIN_DASHBOARD } from "@/app/api/routes/route";
import { MONGODB_CATEGORIES } from '@/app/api/mongodb_api/route';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(MONGODB_CATEGORIES);
      const categoriesData = await response.json();
      setCategories(categoriesData.categories_data);

      const initialCheckedState = categoriesData.length > 0 ? categoriesData.categories.map(categories => categories.status === 1) : '';
      setIsChecked(initialCheckedState);
    };
    fetchData();
  }, []);

  const deleteCategoryHeader = async (categories_id) => {
    const confirmation = confirm("Are you sure you want to delete this category?");
    if (confirmation === true) {
      const response = await fetch(MONGODB_CATEGORIES + '/' + categories_id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok === true) {
        const updatedCategories = categories.filter(item => item._id !== categories_id);
        setCategories(updatedCategories);
        toast.success("Category deleted deleted successfully");
      } else {
        toast.error(error);
      }
    }
  }

  const handleCheckboxChange = async (e, categories_id) => {
    const status_value = e.target.checked ? 1 : 2;
    setIsChecked(e.target.checked);
    try {
      const response = await axios.put(MONGODB_CATEGORIES + "/" + categories_id, { status: status_value });
      const updatedCategoriesData = response.data.categories_id;

      setCategories(prevCategories => {
        return prevCategories.map(categories_id => {
          if (categories_id._id === categories_id) {
            const updatedStatus = updatedCategoriesData.status === 1 ? 2 : 1;
            return { ...updatedCategoriesData, status: updatedStatus };
          } else {
            return categories_id;
          }
        });
      });

      toast.success("Status updated successfully.");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  }

  return (
    <div className='categories_page sm:ml-60'>
      <div className="categories_title">
        <h1 className='text-5xl font-bold leading-loose text-center py-3'>Categories</h1>
      </div>
      <div className="categories_data">
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
                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Categories</span>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="add_categories_option text-end sm:mr-16 mr-4 mb-4 sm:w-0 w-full">
            <Link href={ADMIN_ADD_CATEGORIES}><FontAwesomeIcon icon={faPlusSquare} className='text-4xl plus_icon hover:text-blue-700' /></Link>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 border-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600">
            <thead className="text-gray-600 uppercase border-b-2">
              <tr>
                <th className="px-6 py-4 whitespace-pre">Name</th>
                <th className="px-6 py-4 whitespace-pre">Category Type</th>
                <th className="px-6 py-4 whitespace-pre">Category Heading</th>
                <th className="px-6 py-4 whitespace-pre">Status</th>
                <th className="px-6 py-4 whitespace-pre">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                categories?.map((category, index) => (
                  <tr key={category._id} className="text-gray-600 border-b-2 border-gray-200">
                    <td className="px-6 py-4 whitespace-pre">{category?.name || "-"}</td>
                    <td className="px-6 py-4 whitespace-pre">{category?.name || "-"}</td>
                    <td className="px-6 py-4 whitespace-pre">{category?.name || "-"}</td>
                    <td className="px-6 py-4 whitespace-pre">{category?.status === 1 ? "Active" : "Inactive" || "-"}</td>
                    <td className="flex items-center px-6 py-2">
                      <Link href={`${ADMIN_EDIT_CATEGORIES}/${category?._id}`} className="text-blue-700 mr-2 user_edit_option"><FontAwesomeIcon icon={faPenToSquare} title='Edit Category Header' /></Link>
                      <Link href="#" className="text-red-600 mr-2 user_delete_option" onClick={() => deleteCategoryHeader(category?._id)}><FontAwesomeIcon icon={faTrashCan} title='Delete Category' /></Link>
                      <div className="toggle_buttom">
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                          <input type="checkbox" value={category.status} className="sr-only peer" checked={isChecked[index]} onChange={(e) => handleCheckboxChange(e, category._id)} />
                          <div className="relative top-3 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "> </div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="no-data">
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-600">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Categories