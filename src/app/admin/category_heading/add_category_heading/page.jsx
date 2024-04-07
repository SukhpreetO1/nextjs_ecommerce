"use client";
import React, { useState } from 'react'
import { ADMIN_CATEGORY_HEADING, InputField, MONGODB_CATEGORY_HEADING, SubmitButton, axios, toast, useRouter, validate_category_header } from '@/app/api/routes/route';

const AddCategoryheading = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({name : ''});
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const validation_errors = validate_category_header({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const addCategoryHeadingForm = async (e) => {
        e.preventDefault();
        const validation_errors = validate_category_header(formData);
        if (Object.keys(validation_errors).length === 0) {
            try {
                const response = await axios.post(MONGODB_CATEGORY_HEADING, formData);
                setFormData({ name: '' });
                router.push(ADMIN_CATEGORY_HEADING);
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
            <div className='add_category_heading_page sm:ml-60'>
                <div className="add_category_heading_title">
                    <h1 className='text-5xl font-bold leading-loose text-center py-3'>Add Category Heading</h1>
                </div>

                <div className="add_category_heading_form w-2/5 sm:ml-96">
                    <form method='POST' onSubmit={addCategoryHeadingForm}>
                        <div className="add_category_name">
                            <InputField label_heading="Category Header Name " id="add_category_header_name" className="add_category_header_name" name="name" placeholder="Add Category Header Name..." div_name="add_category_header_name" value={formData.name} onChange={handleInputChange} error={errors.name} />
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

export default AddCategoryheading
