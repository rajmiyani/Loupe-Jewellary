import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../state/store';

const MyAccount = () => {
  const { auth } = useSelector(store => store);


  return (
    <div className='h-full w-full flex justify-center items-center' >
      <div className='w-[50vw] h-fit border-[#6a9eb5] rounded-md' style={{ border: '1px solid #6a9eb5' }}>
        <h1 className='bg-blue-50 p-3 font-semibold text-lg' style={{ color: "#6a9eb5", borderBottom: '1px solid #6a9eb5' }}>Personal Information</h1>
        <div className='p-3'>
          <table className='w-1/2'>
            <tbody>
              <tr>
                <td className='text-base font-medium'>First Name</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5'>{auth?.user?.firstName}</td>
              </tr>

              <tr>
                <td className='text-base font-medium'>Last Name</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5'>{auth?.user?.lastName}</td>
              </tr>

              <tr>
                <td className='text-base font-medium'>Email</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5'>{auth?.user?.email}</td>
              </tr>

              <tr>
                <td className='text-base font-medium'>Mobile no.</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5'>{auth?.user?.mobile ?? '-'}</td>
              </tr>

              <tr>
                <td className='text-base font-medium'>Street Address</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5' style={{ textTransform: 'capitalize' }}>{auth?.user?.address?.[0]?.streetAddress ?? '-'}</td>
              </tr>

              <tr>
                <td className='text-base font-medium'>City</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5' style={{ textTransform: 'capitalize' }}>{auth?.user?.address?.[0]?.city ?? '-'}, &nbsp;{auth?.user?.address?.[0]?.zipCode ?? '-'}</td>
              </tr>

              <tr>
                <td className='text-base font-medium'>State</td>
                <td className='text-base font-semibold'>:</td>
                <td className='text-base font-semibold pl-5' style={{ textTransform: 'capitalize' }}>{auth?.user?.address?.[0]?.state ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
