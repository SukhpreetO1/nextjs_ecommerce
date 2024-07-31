import { NextResponse } from 'next/server';
import { FORGOT_PASSWORD, LOGIN_URL, SIGNUP_URL, USER_DASHBOARD, HOME_URL, ADMIN_DASHBOARD } from '@/app/api/routes/route';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log("error1");

  const isPublicPath = path === LOGIN_URL || path === SIGNUP_URL || path === FORGOT_PASSWORD;

  const token = request.cookies?.get('current_user_token');
  const admin_token = request.cookies?.get('current_admin_token');
  const super_admin_token = request.cookies?.get('current_super_admin_token');
  console.log("error2");
  if (!(token || admin_token || super_admin_token) && !(isPublicPath || path === HOME_URL)) {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
  } else if (token && path === HOME_URL) {
    return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
  }
  console.log("error3");
  if (admin_token && isPublicPath) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  } else if (admin_token && path === HOME_URL) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  }

  if (super_admin_token && isPublicPath) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  } else if (super_admin_token && path === HOME_URL) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  }
  console.log("error4");
  return NextResponse.next();
}

export const config = {
  runtime: 'experimental-edge',
  unstable_allowDynamic: [
    '/lib/utilities.js',
    '/node_modules/mongoose/**',
  ],
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot_password",
    "/dashboard",
    "/admin",
    "/admin/:path",
  ],
}