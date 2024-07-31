"use client";
import React, { useEffect, useState } from 'react'
import { ADMIN_CATEGORIES, ADMIN_DASHBOARD, InputField, Link, MONGODB_CATEGORY_HEADING, MONGODB_CATEGORIES, SubmitButton, axios, toast, useRouter, validate_category_header } from '@/app/api/routes/route';

const AddCategories = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '' });
    const [categoryHeading, setCategoryHeading] = useState();
    const [categoryTypes, setCategoryTypes] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const categoryHeadingResponse = await (fetch(MONGODB_CATEGORY_HEADING));
            const categoryHeadingData = await (categoryHeadingResponse.json());
            setCategoryHeading(categoryHeadingData.category_heading);
        }
        fetchData();
    }, []);

    const selectCategoryHeading = async (event) => {
        const selectedCategoryId = event.target.value;
        try {
            const categoryTypesResponse = await fetch(`${MONGODB_CATEGORIES}/${selectedCategoryId}`);
            const categoryTypesData = await categoryTypesResponse.json();
            if (categoryTypesData.category_types.length === 0) {
                setCategoryTypes(["No category types found"]);
            } else {
                setCategoryTypes(categoryTypesData.category_types);
            }           
        } catch (error) {
            console.error('Error fetching category types:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const validation_errors = validate_category_header({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const addCategoriesForm = async (e) => {
        e.preventDefault();
        const validation_errors = validate_category_header(formData);
        if (Object.keys(validation_errors).length === 0) {
            try {
                const response = await axios.post(MONGODB_CATEGORY_HEADING, formData);
                setFormData({ name: '' });
                router.push(ADMIN_CATEGORIES);
                toast.success("Category Header Added Successfully");
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
            <div className='add_categories_page sm:ml-60'>
                <div className="add_categories_title">
                    <h1 className='text-5xl font-bold leading-loose text-center py-3'>Add Category </h1>
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
                                <Link href={ADMIN_CATEGORIES} className="inline-flex items-center text-sm font-medium text-black hover:text-blue-600 dark:text-gray-600 dark:hover:text-blue-600">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-600 dark:hover:text-blue-600">Category </span>
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Add Category</span>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="add_category_form w-2/5 sm:ml-96">
                    <form method='POST' onSubmit={addCategoriesForm}>
                        <div className="category_heading">
                            <span>Select Category Heading <span className="important_mark text-red-500">*</span></span>
                            {categoryHeading && categoryHeading.length > 0 && (
                                <div className='category_heading_select_option'>
                                    <label htmlFor="category_heading_select" className="sr-only">Select Category Heading</label>
                                    <select id="category_heading_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={selectCategoryHeading}>
                                        <option value="">Choose Category Heading</option>
                                        {categoryHeading.filter(category_heading => category_heading.status === 1).map((category_heading, index) => (
                                            <option key={index} value={category_heading._id}>{category_heading.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="category_types mt-4">
                            <span>Select Category Types <span className="important_mark text-red-500">*</span></span>
                            {categoryTypes && categoryTypes.length > 0 && (
                                <div className='category_types_select_option'>
                                    <label htmlFor="category_types_select" className="sr-only">Select Category Types</label>
                                    <select id="category_types_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                        <option value="">Choose Category Types</option>
                                        {categoryTypes.filter(category_type => category_type.status === 1).map((category_type, index) => (
                                            <option key={index} value={category_type._id}>{category_type.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="add_category_name mt-4">
                            <InputField label_heading="Add Category Header Name " id="add_category_header_name" className="add_category_header_name" name="name" placeholder="Add Category Header Name..." div_name="add_category_header_name" value={formData.name} onChange={handleInputChange} error={errors.name} />
                        </div>
                        <div className='submit_button'>
                            <SubmitButton className="add_category_heading_button" id="add_category_heading_button" name="add_category_heading_button" div_name="add_category_heading_button" label="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCategories