"use client";
import { useEffect, useState } from 'react';
import { Cookies, Navbar } from "@/app/api/routes/route";

export default function ClientCookieHandler({ children }) {
  const [adminCookie, setAdminCookie] = useState(null);
  const [superCookie, setSuperCookie] = useState(null);

  useEffect(() => {
    const admin = Cookies.get('current_admin_token');
    const superAdmin = Cookies.get('current_super_admin_token');
    setAdminCookie(admin);
    setSuperCookie(superAdmin);
  }, []);

  return (
    <>
      {!(adminCookie || superCookie) ? <Navbar /> : ''}
      {children}
    </>
  );
}
