import React from 'react'

const User_details = () => {
    return (
        <>
            <div className='user_details_page sm:ml-60'>
                <div className="user_details_heading">
                    <h1 className='text-5xl font-bold leading-loose text-center py-3'>User Details</h1>
                </div>
                <div className="user_details_data">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 border-4">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-600">
                            <thead class="text-gray-600 uppercase border-b-2">
                                <tr>
                                    <th class="px-6 py-4">First Name</th>
                                    <th class="px-6 py-4">Last Name</th>
                                    <th class="px-6 py-4">Email</th>
                                    <th class="px-6 py-4">Username</th>
                                    <th class="px-6 py-4">Role</th>
                                    <th class="px-6 py-4">Date of Birth</th>
                                    <th class="px-6 py-4">Mobile Number</th>
                                    <th class="px-6 py-4">Gender</th>
                                    <th class="px-6 py-4">Hobbies</th>
                                    <th class="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-gray-600">
                                    <td class="px-6 py-4">Sukhpreet</td>
                                    <td class="px-6 py-4">Singh</td>
                                    <td class="px-6 py-4">ssingh77022@gmail.com</td>
                                    <td class="px-6 py-4">Sukhpreet001</td>
                                    <td class="px-6 py-4">Admin</td>
                                    <td class="px-6 py-4">1999-09-06</td>
                                    <td class="px-6 py-4">+91 6239910788</td>
                                    <td class="px-6 py-4">Malw</td>
                                    <td class="px-6 py-4">Football, Painting, Musix</td>
                                    <td class="flex items-center px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_details
