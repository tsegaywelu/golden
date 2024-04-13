import React, { useEffect, useState } from 'react'
import API from './Utility/API'

const News = () => {
    const [news,setnews]=useState([])
    //i will display news in this page
    useEffect(() => {
        API.getnews()
        .then((res) => {
            console.log(res)
            setnews(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        
        
    },[])
  return (
    <div>
      <div className="max-w-7xl mx-auto my-8 px-2">
    
    <div className="flex justify-center text-2xl md:text-3xl font-bold mb-4">
        <i>ሓደሽቲ ሓበሬታት!</i>
    </div>

    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
        {news?.map(n=>(
            <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-primary-400">

            <a className="relative" href='#'>
                <div className="relative w-full aspect-video">
                   {n?.imageUrl.includes('mp4')||n?.imageUrl.includes('mkv')?<video src={`http://localhost:3000/public/${n?.imageUrl}`} autoPlay controls></video>: <img className="rounded w-full h-full object-cover"
                        src={`http://localhost:3000/public/${n?.imageUrl}`}/>}
            
                
                </div>
            </a>

            <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
                <h3 className="text-lg font-bold">{n?.Title}</h3>

                <p className="text-gray-600 two-lines">
                 {n?.description}
                </p>

                <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                    <li title="Pricing type"
                        className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 3.5C13 2.94772 12.5523 2.5 12 2.5C11.4477 2.5 11 2.94772 11 3.5V4.0592C9.82995 4.19942 8.75336 4.58509 7.89614 5.1772C6.79552 5.93745 6 7.09027 6 8.5C6 9.77399 6.49167 10.9571 7.5778 11.7926C8.43438 12.4515 9.58764 12.8385 11 12.959V17.9219C10.2161 17.7963 9.54046 17.5279 9.03281 17.1772C8.32378 16.6874 8 16.0903 8 15.5C8 14.9477 7.55228 14.5 7 14.5C6.44772 14.5 6 14.9477 6 15.5C6 16.9097 6.79552 18.0626 7.89614 18.8228C8.75336 19.4149 9.82995 19.8006 11 19.9408V20.5C11 21.0523 11.4477 21.5 12 21.5C12.5523 21.5 13 21.0523 13 20.5V19.9435C14.1622 19.8101 15.2376 19.4425 16.0974 18.8585C17.2122 18.1013 18 16.9436 18 15.5C18 14.1934 17.5144 13.0022 16.4158 12.1712C15.557 11.5216 14.4039 11.1534 13 11.039V6.07813C13.7839 6.20366 14.4596 6.47214 14.9672 6.82279C15.6762 7.31255 16 7.90973 16 8.5C16 9.05228 16.4477 9.5 17 9.5C17.5523 9.5 18 9.05228 18 8.5C18 7.09027 17.2045 5.93745 16.1039 5.17721C15.2467 4.58508 14.1701 4.19941 13 4.0592V3.5ZM11 6.07814C10.2161 6.20367 9.54046 6.47215 9.03281 6.8228C8.32378 7.31255 8 7.90973 8 8.5C8 9.22601 8.25834 9.79286 8.79722 10.2074C9.24297 10.5503 9.94692 10.8384 11 10.9502V6.07814ZM13 13.047V17.9263C13.7911 17.8064 14.4682 17.5474 14.9737 17.204C15.6685 16.7321 16 16.1398 16 15.5C16 14.7232 15.7356 14.1644 15.2093 13.7663C14.7658 13.4309 14.0616 13.1537 13 13.047Z"
                                fill="currentColor"></path>
                        </svg>
                        <span>50</span>
                    </li>

                </ul>

                <ul className="flex flex-wrap text-sm gap-2 my-1">
                    <li className="flex items-center gap-2">
                        <span>Content Generation,</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span><a href="" className='text-green-800'>see more</a></span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span>SEO,</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span>Writing</span>
                    </li>
                </ul>
            </div>

        </li>
        ))}
        

           
</ul>
</div>
              

    </div>
  )
}

export default News