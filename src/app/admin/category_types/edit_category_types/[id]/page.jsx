"use client";
import React, { useEffect, useState } from 'react'
import { ADMIN_CATEGORY_TYPES, ADMIN_DASHBOARD, InputField, Link, MONGODB_CATEGORY_HEADING, MONGODB_CATEGORY_TYPES, SubmitButton, axios, toast, useRouter, validate_category_types } from '@/app/api/routes/route';

const EditCategorytypes = (req) => {
    const router = useRouter();
    const id = req.params.id;
    const [formData, setFormData] = useState({ name: '', category_heading_id: '' });
    const [categoryHeaders, setCategoryHeaders] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const categoryHeaderResponse = await fetch(MONGODB_CATEGORY_HEADING);
            const categoryHeaderData = await categoryHeaderResponse.json();
            setCategoryHeaders(categoryHeaderData.category_heading);

            const categoryTypesResponse = await fetch(MONGODB_CATEGORY_TYPES + '/' + id);
            const categoryTypesData = await categoryTypesResponse.json();
            const categoryTypes = categoryTypesData.category_type;
            setFormData({ name: categoryTypes.name, category_heading_id: categoryTypes.category_heading_id });
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const validation_errors = validate_category_types({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(validation_errors);
    };    

    const editCategoryTypesForm = async (e) => {
        e.preventDefault();
        const validation_errors = validate_category_types(formData);
        if (Object.keys(validation_errors).length === 0) {
            try {
                const response = await axios.put(MONGODB_CATEGORY_TYPES + "/" + id, formData);
                setFormData({ name: '', category_heading_id: '' });
                router.push(ADMIN_CATEGORY_TYPES);
                toast.success("Category Types Updated Successfully.");
            } catch (error) {
                if (error.response.data.error && error.response.data.error.includes('duplicate key error collection')) {
                    toast.error("Name already exits. Please choose a different name.");
                }
            }
        } else {
            setErrors(validation_errors);
        }
    }
    return (
        <>
            <div className='edit_category_types_page sm:ml-60'>
                <div className="edit_category_types_title">
                    <h1 className='text-5xl font-bold leading-loose text-center py-3'>Edit Category Types</h1>
                </div>

                <div className='admin_breadcrumbs hidden sm:block w-fit ml-4 -mt-4 mb-4'>
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
                            <li className="inline-flex items-center">
                                <Link href={ADMIN_CATEGORY_TYPES} className="inline-flex items-center text-sm font-medium text-black hover:text-blue-600 dark:text-gray-600 dark:hover:text-blue-600">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-600 dark:hover:text-blue-600">Category Types</span>
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Edit Category Type</span>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="edit_category_types_form w-2/5 sm:ml-96">
                    <form method='POST' onSubmit={editCategoryTypesForm}>
                        <div className="edit_category_name">
                            <InputField label_heading="Category Types Name " id="edit_category_type_name" className="edit_category_type_name" name="name" placeholder="Edit Category Type Name..." div_name="edit_category_type_name" value={formData.name} onChange={handleInputChange} error={errors.name} />
                        </div>
                        <div className="edit_category_header_dropdown_name mb-6">
                            {categoryHeaders ? (
                                <div>
                                    <fieldset>
                                        <h1 className='block text-sm font-medium leading-6 text-gray-900 mb-2'>Choose Category Header <span className='important_mark text-red-500'>*</span></h1>
                                        <div className="relative border border-gray-300 text-gray-800 shadow-lg rounded-sm">
                                            <label htmlFor="category_heading_id"></label>
                                            <select className="category_heading_id appearance-none w-full py-1 px-2 rounded-sm" name="category_heading_id" id="category_heading_id" value={formData.category_heading_id} onChange={handleInputChange} >
                                                <option value="" disabled>Please select one category heading...</option>
                                                {categoryHeaders.map((category_header, index) => (
                                                    <option key={index} value={category_header._id}>{category_header.name}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-red-500 font-semibold text-xs" >{errors.category_heading_id}</span>
                                    </fieldset>
                                </div>
                            ) : ""}
                        </div>
                        <div className='submit_button'>
                            <SubmitButton className="edit_category_types_button" id="edit_category_types_button" name="edit_category_types_button" div_name="edit_category_types_button" label="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCategorytypes