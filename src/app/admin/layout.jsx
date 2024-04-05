"use client"
import { Sidebar } from "@/app/api/routes/route";

export default function CommonLayout({
  children,
}) {
  return (
    <section>
      <Sidebar />
      {children}
    </section>
  )
}