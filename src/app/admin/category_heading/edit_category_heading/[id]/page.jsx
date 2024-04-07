"use client";
import React, { useEffect, useState } from 'react'
import { ADMIN_CATEGORY_HEADING, InputField, MONGODB_CATEGORY_HEADING, SubmitButton, axios, toast, useRouter, validate_category_header } from '@/app/api/routes/route';

const editCategoryHeader = (req) => {
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
    }, [])

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

export default editCategoryHeader
