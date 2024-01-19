import React from 'react'
import { useState,useEffect } from 'react'


const Box = ({handleclick,x,y,val,setMove}) => {
    const [toggle, setToggle] = useState(false)
    const handleRightClick = (e)=>{
        e.preventDefault()
        setToggle(!toggle)
        setMove((prev)=> prev+1)
    }
   

  return (
    <div className={`border-2 border-solid h-[30px] w-[30px] text-center boxfont rounded-md ${val.appear ?'drop-shadow-2xl':''}  ${toggle ? 'bg-yellow-300':'hover:bg-red-700'}`} 
    onContextMenu={(e) => handleRightClick(e)} onClick = {()=>{handleclick(x,y);setMove((prev)=> prev+1) } }>
        {val.appear ? val.val===-1 ? <img  src="https://svgsilh.com/svg/147841.svg" className='h-full border-red-700 animate-pulse bg-red-400'/>:val.val:''}
    </div>
  )
}

export default Box