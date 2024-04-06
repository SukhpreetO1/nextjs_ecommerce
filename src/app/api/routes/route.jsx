import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// getting data from components
import CheckboxField from "@/components/CheckboxField";
import DateField from "@/components/DateField";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import RadioButtonField from "@/components/RadioButtonField";
import SubmitButton from "@/components/SubmitButton";

// js validation files
import { validate_signup_submit_form } from "@/utils/js/signup";
import { validate_login_submit_form } from "@/utils/js/login";
import { validate_forgot_password_submit_form } from "@/utils/js/forgot_password";

// page redirection files
import {
  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD,
  LOGO_IMAGE_URL,
  GOOGLE_LOGO,
  PHONE_NUMBER_LOGO,
  USER_DASHBOARD, 
  ADMIN_DASHBOARD,
  ADMIN_USER_DETAILS,
  ADMIN_CATEGORY_HEADING,
  ADMIN_CATEGORY_TYPES,
  ADMIN_CATEGORIES,
} from "@/app/api/redirection_route/route";

import { 
  MONGODB_API_SIGNUP,
  MONGODB_API_LOGIN,
  MONGODB_API_LOGIN_WITH_GOOGLE
} from "@/app/api/mongodb_api/route";

// firebase import
import { auth, db } from "@/db/firebase";

import {  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithCustomToken,
  sendPasswordResetEmail,
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";

import { 
  ref, 
  uploadBytes, 
  getStorage, 
  getDownloadURL 
} from "firebase/storage";

// use toastify for notification
import { ToastContainer, toast } from "react-toastify";

// use fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// used to store data in cookies
import Cookies from "js-cookie";

// use for hashing password
import bcrypt, { hash } from "bcryptjs";

// use for jwt
import jwt from "jsonwebtoken";

// import mongoose database
import mongoose from "mongoose";

import { connect } from "@/db/mongoDB"
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// modal redirection 
import Privacy_Policy from "@/modals/privacy_policy";
import Roles from "@/modals/roles";
import Terms_and_conditions from "@/modals/terms_and_conditions";
import User from "@/modals/users";
import Category_Heading from "@/modals/category_heading";
import Category_Types from "@/modals/category_types";
import Categories from "@/modals/Categories";

import Sidebar from "@/app/admin/(sidebar)/page";

export {
  Link,
  useRouter,
  usePathname,
  Image,

  CheckboxField,
  DateField,
  InputField,
  PasswordField,
  RadioButtonField,
  SubmitButton,

  validate_signup_submit_form,
  validate_login_submit_form,
  validate_forgot_password_submit_form,

  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD,
  LOGO_IMAGE_URL,
  GOOGLE_LOGO,
  PHONE_NUMBER_LOGO,
  USER_DASHBOARD, 
  ADMIN_DASHBOARD,
  ADMIN_USER_DETAILS,
  ADMIN_CATEGORY_HEADING,
  ADMIN_CATEGORY_TYPES,
  ADMIN_CATEGORIES,

  MONGODB_API_SIGNUP,
  MONGODB_API_LOGIN,
  MONGODB_API_LOGIN_WITH_GOOGLE,

  auth,
  db,

  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithCustomToken,
  sendPasswordResetEmail,
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,

  ref, 
  uploadBytes, 
  getStorage, 
  getDownloadURL,

  ToastContainer,
  toast,

  FontAwesomeIcon,
  faPenToSquare, 
  faTrashCan,
  faEye, 
  faEyeSlash,

  Cookies,

  bcrypt,
  hash,

  jwt,

  mongoose,
  connect,
  NextRequest, 
  NextResponse,
  axios,

  Privacy_Policy,
  Roles, 
  Terms_and_conditions, 
  User, 
  Category_Heading,
  Category_Types,
  Categories,

  Sidebar,
};