import ChipAutoComplete from '../../projectintern/app/components/chipAutoComplete.jsx'
import Image from 'next/image'
import Link from 'next/link.js'
export default function Home() {
  return (
   <>
   <div className="" >
    <div  className='mb-8'>
   <ChipAutoComplete/>
   </div>

   <div className=' flex flex-col gap-2 items-center justify-center ' >
    
   *** Please Select Me ***
   <Link href={"https://github.com/Harshan-Nayak/selectme/tree/main/projectintern"} >  <button className=' bg-black text-white p-3  rounded-[50px] ' >Github Code</button></Link>
   <Link href={"https://harshan-portfolio.vercel.app/"} >  <button className=' bg-black text-white p-3  rounded-[50px] ' >My Portfolio</button></Link>
   </div>
   </div>
   
   </>
  )
}
