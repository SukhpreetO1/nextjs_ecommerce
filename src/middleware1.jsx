import { NextResponse } from 'next/server';
import { FORGOT_PASSWORD, LOGIN_URL, SIGNUP_URL, NAVBAR_DASHBOARD, HOME_URL, ADMIN_DASHBOARD } from '@/app/api/routes/route';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === LOGIN_URL || path === SIGNUP_URL || path === FORGOT_PASSWORD;

  const token = request.cookies.get('currentUserToken');
  const admin_token = request.cookies.get('currentAdminToken');

  console.log("token", token);
  console.log("admin_token", admin_token);

  if (!(token || admin_token) && !isPublicPath) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(NAVBAR_DASHBOARD, request.url));
  } else if (token && path == HOME_URL) {
    return NextResponse.redirect(new URL(NAVBAR_DASHBOARD, request.url));
  }

  if (admin_token && isPublicPath) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  } else if (admin_token && path == HOME_URL) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot_password",
    "/dashboard",

    "/admin/dashboard",
    "/admin/user_details",
    "/admin/category_heading",
    "/admin/category_heading/add_category_heading",
    "/admin/category_heading/edit_category_heading/:id",
    "/admin/category_types",
    "/admin/category_types/add_category_types",
    "/admin/category_types/edit_category_types/:id",
    "/admin/categories",
    "/admin/categories/add_categories",
    "/admin/categories/edit_categories/:id",
  ],
}