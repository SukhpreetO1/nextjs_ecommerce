import { HOME_URL, Link, Navbar } from "@/app/api/routes/route";

export default function NotFound() {
  return (
    <>
      <div className="bg-gray-500 h-full">
        <div className="text-center text-white p-24">
          <div className="border-2 p-16 rounded-2xl">
            <h2 className="text-7xl uppercase">Not Found !!</h2>
            <p className="text-2xl mt-4">Could not find requested resource</p>
            <p className="text-2xl mt-4 pb-12">Please contact with the admin regarding this page.</p>
            <Link href={HOME_URL} className="text-xl border-2 border-blue-700 rounded-lg px-4 py-2 bg-blue-700">Return Home</Link>
          </div>
        </div>
      </div>
    </>
  )
}