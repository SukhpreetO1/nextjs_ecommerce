"use client";
import { InputField, DateField, RadioButtonField, CheckboxField, PasswordField, SubmitButton, validate_signup_submit_form, LOGIN_URL, Link, toast, useRouter, auth, createUserWithEmailAndPassword, axios, MONGODB_API_SIGNUP, MONGODB_ROLE_DATA } from '@/app/api/routes/route';
import React, { useState } from 'react';

const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
];

const hobbiesOptions = [
    { label: 'Football', value: 'Football', selected: false },
    { label: 'Cricket', value: 'Cricket', selected: false },
    { label: 'Basketball', value: 'Basketball', selected: false },
    { label: 'Tennis', value: 'Tennis', selected: false },
    { label: 'Others', value: 'Others', selected: false },
];

const Signup = () => {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        date_of_birth: '',
        mobile_number: '',
        gender: '',
        hobbies: '',
        password: '',
        confirm_password: '',
    });

    const handleFieldChange = (name, value) => {
        const validation_errors = validate_signup_submit_form({ ...formData, [name]: value });
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleFieldChange(name, value);
    };

    const handleOptionSelect = (value) => {
        handleFieldChange('gender', value);
    };

    const handleCheckboxSelect = (selectedHobbies) => {
        handleFieldChange('hobbies', selectedHobbies);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const validation_errors = validate_signup_submit_form(formData);

        if (Object.keys(validation_errors).length > 0) {
            setErrors(validation_errors);
            return;
        }

        try {
            const role_response = await axios.post(MONGODB_ROLE_DATA, formData);
            const role_id = role_response.data._id;
            const response = await axios.post(MONGODB_API_SIGNUP, { ...formData, role_id });
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            router.push(LOGIN_URL);
            toast.success(response.data.message);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email is already in use. Please choose a different email.");
            } else {
                toast.error(error.response.data.error);
            }
        }
    };

    return (
        <div className="sign_up_form -2/5">
            <div className="heading font-bold text-center">
                <h1 className="text-3xl mt-16">Create a new account</h1>
            </div>

            <form className="signup_form mt-8" onSubmit={formSubmit}>
                <div className="first_name_last_name flex col-span-6">
                    <InputField label_heading="First Name" id="first_name" className="first_name" name="first_name" placeholder="First name" div_name="signup_first_name" value={formData.first_name} onChange={handleInputChange} error={errors.first_name} />
                    <InputField label_heading="Last Name" id="last_name" className="last_name" name="last_name" placeholder="Last name" div_name="signup_last_name" value={formData.last_name} onChange={handleInputChange} error={errors.last_name} />
                </div>

                <div className="email_username flex col-span-6">
                    <InputField label_heading="Email" id="email" className="email" name="email" placeholder="Email" div_name="signup_email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                    <InputField label_heading="Username" id="username" className="username" name="username" placeholder="Username" div_name="signup_username" value={formData.username} onChange={handleInputChange} error={errors.username} />
                </div>

                <div className="date_of_birth_mobile_number flex">
                    <DateField label_heading="Date of birth" id="date_of_birth" className="date_of_birth" name="date_of_birth" div_name="signup_date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} error={errors.date_of_birth} />
                    <InputField label_heading="Mobile Number" id="mobile_number" className="mobile_number" name="mobile_number" placeholder="Mobile Number" div_name="signup_mobile_number" value={formData.mobile_number} onChange={handleInputChange} error={errors.mobile_number} />
                </div>

                <div className="gender">
                    <RadioButtonField label_heading="Gender" div_name="signup_gender" className="gender" options={genderOptions} onSelect={handleOptionSelect} error={errors.gender} />
                </div>

                <div className="hobbies">
                    <CheckboxField label_heading="Hobbies" div_name="signup_hobbies" className="hobbies" options={hobbiesOptions} onSelect={handleCheckboxSelect} error={errors.hobbies} />
                </div>

                <div className="password_confirm_password flex">
                    <PasswordField label_heading="Password" id="password" className="password" name="password" placeholder="Password" div_name="signup_password" value={formData.password} onChange={handleInputChange} error={errors.password} />
                    <PasswordField label_heading="Confirm Password" id="confirm_password" className={`confirm_password ${formData.confirm_password === "" ? '' : formData.password === formData.confirm_password ? 'matched_passwords' : 'not_matched_passwords'}`} name="confirm_password" placeholder="Confirm Password" div_name="signup_confirm_password" value={formData.confirm_password} onChange={handleInputChange} error={errors.confirm_password} />
                </div>

                <div className="submit_button">
                    <SubmitButton className="signup_submit_button" id="signup_submit_button" name="signup_submit_button" div_name="signup_submit_button" label="Signup" />
                </div>
            </form>
            <div>
                <Link href={LOGIN_URL} className="underline underline-offset-4 italic text-blue-500"><p className="mt-3 text-center text-sm text-blue-500">Already have an account?</p></Link>
            </div>
        </div> 
    );
};

export default Signup;