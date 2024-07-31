"use client";
import React, { useEffect, useState } from 'react'
import { ADMIN_CATEGORY_HEADING, ADMIN_DASHBOARD, InputField, Link, MONGODB_CATEGORY_HEADING, SubmitButton, axios, toast, useRouter, validate_category_header } from '@/app/api/routes/route';

const EditCategoryHeader = (req) => {
    const router = useRouter();
    const id = req.params.id
    const [formData, setFormData] = useState({name : ''});
    const [errors, setErrors] = useState({});

    useEffect( () => {
       const fetchData = async () => {
        const response = await fetch (MONGODB_CATEGORY_HEADING + '/' + id);
        const categoryHeadingData = await response.json();
        setFormData(categoryHeadingData.category_heading)
       }
       fetchData();
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const validation_errors = validate_category_header({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const editCategoryHeadingForm = async (e) => {
        e.preventDefault();
        const validation_errors = validate_category_header(formData);
        if (Object.keys(validation_errors).length === 0) {
            try {
                const response = await axios.put(MONGODB_CATEGORY_HEADING + "/" + id, formData);
                setFormData({ name: '' });
                router.push(ADMIN_CATEGORY_HEADING);
                toast.success("Category Header updated successfully");
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
            <div className='edit_category_heading_page sm:ml-60'>
                <div className="edit_category_heading_title">
                    <h1 className='text-5xl font-bold leading-loose text-center py-3'>Edit Category Heading</h1>
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
                                <Link href={ADMIN_CATEGORY_HEADING} className="inline-flex items-center text-sm font-medium text-black hover:text-blue-600 dark:text-gray-600 dark:hover:text-blue-600">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-600 dark:hover:text-blue-600">Category Heading</span>
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Edit Category Heading</span>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="edit_category_heading_form w-2/5 sm:ml-96">
                    <form method='POST' onSubmit={editCategoryHeadingForm}>
                        <div className="edit_category_name">
                            <InputField label_heading="Category Header Name " id="edit_category_header_name" className="edit_category_header_name" name="name" placeholder="Add Category Header Name..." div_name="edit_category_header_name" value={formData.name} onChange={handleInputChange} error={errors.name} />
                        </div>
                        <div className='submit_button'>
                            <SubmitButton className="edit_category_heading_button" id="edit_category_heading_button" name="edit_category_heading_button" div_name="edit_category_heading_button" label="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCategoryHeader
