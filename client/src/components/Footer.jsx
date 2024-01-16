import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-gray-900 overflow-hidden'>
        <div className='w-full sm:max-w-[60%] ml-5 sm:m-auto h-full py-10'>
            <div className='flex items-center gap-2 text-[#5f5e5e] pb-5 border-b-[1px] border-slate-600'>
                <h2>Language: </h2>
                <p className='hover:text-[#12D3BF] text-lg cursor-pointer'>English</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 py-5 border-b-[1px] border-slate-600 '>
                <div>
                    <h2 className='text-slate-300 mb-2'>Pearson PTE</h2>
                    <ul className='text-[#5f5e5e]'>
                        <li>Pearson Official website.</li>
                        <li>Pearson PTE mock tests.</li>
                        <li>Pearson Official website.</li>
                        <li>Pearson Official website.</li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-slate-300 mb-2'>Pearson PTE</h2>
                    <ul className='text-[#5f5e5e]'>
                        <li>Pearson Official website.</li>
                        <li>Pearson PTE mock tests.</li>
                        <li>Pearson Official website.</li>
                        <li>Pearson Official website.</li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-slate-300 mb-2'>Pearson PTE</h2>
                    <ul className='text-[#5f5e5e]'>
                        <li>Pearson Official website.</li>
                        <li>Pearson PTE mock tests.</li>
                        <li>Pearson Official website.</li>
                        <li>Pearson Official website.</li>
                    </ul>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Footer