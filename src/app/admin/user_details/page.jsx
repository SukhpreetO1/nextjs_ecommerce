"use client";
import { FontAwesomeIcon, Link, faPenToSquare, faTrashCan, MONGODB_USERS_DETAILS } from "@/app/api/routes/route";
import React, { useEffect, useState } from 'react'

const User_details = () => {
    const [usersDetails, setUsersDetails] = useState();
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(MONGODB_USERS_DETAILS);
            const userData = await response.json();
            setUsersDetails(userData.data);
        }
        fetchUsers();
    }, [])
    return (
        <>
            <div className='user_details_page sm:ml-60'>
                <div className="user_details_heading">
                    <h1 className='text-5xl font-bold leading-loose text-center py-3'>User Details</h1>
                </div>
                <div className="user_details_data">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 border-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
                            <thead className="text-gray-600 uppercase border-b-2">
                                <tr>
                                    <th className="px-6 py-4 whitespace-pre">First Name</th>
                                    <th className="px-6 py-4 whitespace-pre">Last Name</th>
                                    <th className="px-6 py-4 whitespace-pre">Email</th>
                                    <th className="px-6 py-4 whitespace-pre">Username</th>
                                    <th className="px-6 py-4 whitespace-pre">Role</th>
                                    <th className="px-6 py-4 whitespace-pre">Date of Birth</th>
                                    <th className="px-6 py-4 whitespace-pre">Mobile Number</th>
                                    <th className="px-6 py-4 whitespace-pre">Gender</th>
                                    <th className="px-6 py-4 whitespace-pre">Hobbies</th>
                                    <th className="px-6 py-4 whitespace-pre">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersDetails && usersDetails.length > 0 ? (
                                    usersDetails?.map((user, index) => (
                                        <tr key={user?.id || index} className="text-gray-600">
                                            <td className="px-6 py-4 whitespace-pre">{user?.first_name || "-"}</td>
                                            <td className="px-6 py-4 whitespace-pre">{user?.last_name || "-"}</td>
                                            <td className="px-6 py-4 whitespace-pre">{user?.email || "-"}</td>
                                            <td className={`px-6 py-4 whitespace-pre ${!user?.username ? 'text-center' : ''}`}>{user?.username || "-"}</td>
                                            <td className={`px-6 py-4 whitespace-pre ${!user?.role_id.name ? 'text-center' : ''}`}>{user?.role_id.name || "-"}</td>
                                            <td className={`px-6 py-4 whitespace-pre ${!user?.date_of_birth ? 'text-center' : ''}`}>
                                                {user?.date_of_birth ? new Date(user.date_of_birth).toISOString().slice(0, 10) : "-"}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-pre ${!user?.mobile_number ? 'text-center' : ''}`}>{user?.mobile_number || "-"}</td>
                                            <td className={`px-6 py-4 whitespace-pre ${!user?.gender ? 'text-center' : ''}`}>{user?.gender || "-"}</td>
                                            <td className={`px-6 py-4 whitespace-pre ${!user?.hobbies ? 'text-center' : ''}`}>{user?.hobbies ? user.hobbies.join(', ') : "-"}</td>
                                            <td className="flex items-center px-6 py-4">
                                                <Link href="#" className="text-blue-700 mr-2 user_edit_option"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                                                <Link href="#" className="text-red-600 mr-2 user_delete_option"><FontAwesomeIcon icon={faTrashCan} /></Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="px-6 py-4 text-center text-gray-600">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_details
