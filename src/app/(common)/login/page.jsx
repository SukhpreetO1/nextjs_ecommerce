"use client";
import { InputField, PasswordField, SubmitButton, validate_login_submit_form, SIGNUP_URL, Link, auth, signInWithEmailAndPassword, useRouter, toast, Cookies, FORGOT_PASSWORD, GOOGLE_LOGO, PHONE_NUMBER_LOGO, Image, signInWithPopup, GoogleAuthProvider, axios, jwt, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, USER_DASHBOARD, MONGODB_API_LOGIN, MONGODB_API_LOGIN_WITH_GOOGLE, MONGODB_API_LOGIN_WITH_PHONE } from '@/app/api/routes/route';
import React, { useState, useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validation_errors = validate_login_submit_form({ ...formData, [name]: value });
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: validation_errors[name] || null }));
  };

  const handleClick = () => setDisabled(true);

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const validation_errors = validate_login_submit_form(formData);
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
    if (Object.keys(validation_errors).length === 0) {
      try {
        setDisabled(true);
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const response = await axios.post(MONGODB_API_LOGIN, formData);
        Cookies.set('currentUserToken', JSON.stringify(response.data.token), { expires: expirationTime });
        router.push(response.data.redirectUrl);
        setDisabled(false);
        toast.success("Login successfully.")
      }
      catch (err) {
        setDisabled(false);
        toast.error("Invalid credential");
      }
    } else {
      setErrors(validation_errors);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
    try {
      await signInWithPopup(auth, provider);
      const response = await axios.post(MONGODB_API_LOGIN_WITH_GOOGLE, {
        fullname: auth.currentUser.displayName || '',
        email: auth.currentUser.email || '',
      });
      if (response.data.message === "Registered Successfully.") {
        Cookies.set('currentUserToken', JSON.stringify(response.data.token), { expires: expirationTime });
        router.push(USER_DASHBOARD);
        toast.success("Login successfully.")
      } else {
        console.log(response.data.error);
        toast.error("Invalid credential.");
      }
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  const handleSendCode = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'send-code-button', { size: 'invisible' });
    try {
      const verification_id = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      toast.success("OTP sent successfully")
      setVerificationId(verification_id);
    } catch (error) {
      toast.error("Phone number is not correct" + error)
      console.error(error);
    }
  };

  const signInWithPhone = async () => {
    let validation_errors = {};
    let isValid = true;

    if (!phoneNumber.trim()) {
      validation_errors.mobile_number = "Mobile number is required";
      isValid = false;
    } else if (!/^\+\d{12}$/i.test(phoneNumber)) {
      validation_errors.mobile_number = "Mobile number should be 13 digits including country code";
      isValid = false;
    }

    if (!verificationCode.trim()) {
      validation_errors.verificationCode = "OTP is required";
      isValid = false;
    }

    if (isValid) {
      const credential = PhoneAuthProvider.credential(verificationId.verificationId, verificationCode);
      try {
        const confirmationResult = await signInWithCredential(auth, credential);
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        const response = await axios.post(MONGODB_API_LOGIN_WITH_PHONE, {
          mobile_number: phoneNumber
        })
        if (response.data.message === "Registered Successfully.") {
          Cookies.set('currentUserToken', JSON.stringify(response.data.token), { expires: expirationTime });
          router.push(USER_DASHBOARD);
          toast.success("Login successfully.")
        } else {
          console.log(response.data.error);
          toast.error("Invalid credential.");
        }
      } catch (err) {
        console.log(err.response.data.error);
      }
    } else {
      setErrors(validation_errors);
    }
  };

  return (
    <>
      <section>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Login </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" action="#" method="POST" onSubmit={loginFormSubmit}>
              <div className="login_email">
                <InputField label_heading="Email" id="email" className="email" name="email" placeholder="Email" div_name="login_email" value={formData.email} onChange={handleInputChange} error={errors.email} />
              </div>
              <div className="login_password">
                <PasswordField label_heading="Password" id="password" className="password" name="password" placeholder="Password" div_name="login_password" value={formData.password} onChange={handleInputChange} error={errors.password} />
              </div>
              <div className="forgot_password text-end text-blue-600 italic font-medium">
                <Link href={FORGOT_PASSWORD} className="forgot_password_link">Forgot Password?</Link>
              </div>
              <div className="login_button">
                <SubmitButton className="login_submit_button" id="login_submit_button" name="login_submit_button" div_name="login_submit_button" label="Login" disabled={disabled} onClick={handleClick} />
              </div>
            </form>
            <div>
              <p className="mt-3 text-center text-sm text-gray-500"> Not a member? <Link href={SIGNUP_URL} className="underline underline-offset-4 italic text-blue-500">Sign up</Link></p>
            </div>
            <div className="other_autherization_method flex justify-center mt-4">
              <div><span className='flex justify-center font-light italic text-gray-500'>- - - - - - - - - Other ways - - - - - - - - -</span>
                <div className='my-4'>
                  <div className="google_autherization cursor-pointer flex my-4" onClick={() => signInWithGoogle()}>
                    <Image src={GOOGLE_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' />
                    <span className='font-light text-gray-500'>Log in with google account</span>
                  </div>
                  <div className="phone_number_autherization cursor-pointer flex" onClick={() => setShowModal(true)}>
                    <Image src={PHONE_NUMBER_LOGO} width={50} height={50} alt="google_logo" className='w-8 h-8 me-3 rounded-lg' />
                    <span className='font-light text-gray-500'>Log in with phone number</span>
                  </div>
                  {showModal && (
                    <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-80">
                      <div className="relative p-4 w-full max-w-2xl max-h-full sign_in_with_mobile_number">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Signin with Mobile Number
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setShowModal(false)}>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                            </button>
                          </div>
                          <div className='mx-8 pb-5'>
                            <div className="singin_with_mobile_number flex">
                              <InputField label_heading="Enter your mobile number" id="mobile_number" className="mobile_number" name="mobile_number" placeholder="Enter your mobile number" div_name="mobile_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} error={errors.mobile_number} />
                              <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-9 w-36 mt-8 ml-4' id="send-code-button" onClick={handleSendCode}>Send Code</button>
                            </div>
                            <div className="verificationCode">
                              <InputField label_heading="Enter OTP" id="verificationCode" className="verificationCode" name="verificationCode" placeholder="Enter OTP" div_name="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} error={errors.verificationCode} />
                            </div>
                            <div className='text-center'>
                              <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={signInWithPhone}>Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
