import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// getting data from components
import InputField from "@/components/InputField";
import DateField from "@/components/DateField";
import RadioButtonField from "@/components/RadioButtonField";
import CheckboxField from "@/components/CheckboxField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";

// js validation files
import { validate_signup_submit_form } from "@/../public/assets/js/signup";
import { validate_login_submit_form } from "@/../public/assets/js/login";
import { validate_forgot_password_submit_form } from "@/../public/assets/js/forgot_password";

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
  ADMIN_DASHBOARD
} from "@/app/api/redirection_route/route";

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
  GoogleAuthProvider
} from "firebase/auth";

// use toastify for notification
import { ToastContainer, toast } from "react-toastify";

// use fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import Roles from "@/modals/roles";
import User from "@/modals/users";

export {
  Link,
  useRouter,
  usePathname,
  Image,

  InputField,
  DateField,
  RadioButtonField,
  CheckboxField,
  PasswordField,
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

  ToastContainer,
  toast,

  FontAwesomeIcon,

  Cookies,

  bcrypt,
  hash,

  jwt,

  mongoose,
  connect,
  NextRequest, 
  NextResponse,
  axios,
  Roles, 
  User, 
};