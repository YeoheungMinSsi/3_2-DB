import '../mytheme.css'
import { useState } from 'react'

function Test() {
  const [value, setValue] = useState(50)
  
  const handleChange = (event) => {
    setValue(event.target.value)
  }


  return (
    <>
      <div>
        <input type="range"
        min={0} max="100"
        value={value}
        onChange={handleChange}
        className="range" />      
      </div>

    </>
  )
}

export default Test
