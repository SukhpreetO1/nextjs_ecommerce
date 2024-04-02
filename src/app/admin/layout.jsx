"use client"
import { Sidebar } from "@/app/api/routes/route";

export default function CommonLayout({
  children,
}) {
  return (
    <section className="flex" >
      <Sidebar />
      {children}
    </section>
  )
}