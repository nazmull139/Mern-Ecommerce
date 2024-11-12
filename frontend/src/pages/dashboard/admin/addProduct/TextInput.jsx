import React from 'react'

const TextInput = ({label, name, placeholder, value,type, onChange}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input 
      type={type} 
      name={name} 
      id={name} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} className='add-product-InputCSS'/>
    </div>
  )
}

export default TextInput