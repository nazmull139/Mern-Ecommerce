import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAddProductMutation } from '../../../../redux/features/products/productsApi'
import SelectInput from './SelectInput'
import TextInput from './TextInput'
import UploadImage from './UploadImage'


const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
]

const colors = [
  { label: 'Select Color', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' }
];


const AddProduct = () => {

    const {user} = useSelector(state => state.auth)

    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        oldPrice: '',
        color: ''
    })
    const [image , setImage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const [AddProduct] = useAddProductMutation()
    
      
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!product.name || !product.category || !product.price || !product.oldPrice  || !product.color || !product.description) {
          alert('Please fill in all fields.');
          return;
      }

      try {
          await AddProduct({...product, image, author: user?._id}).unwrap();
          alert('Product added successfully!');
          setProduct({
              name: '',
              category: '',
              description: '',
              price: '',
              color: ''
          })
          setImage("")
      } catch (error) {
          console.error('Failed to add product:', error);
      }
      
    
  }


  return (
    <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput
                    type="text"
                    label='Product Name'
                    name="name"
                    placeholder="Ex: Dimond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />

                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />

                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />

                 <TextInput
                    type="number"
                    label='Price'
                    name="price"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />
                 <TextInput
                    type="number"
                    label='Old Price'
                    name="oldPrice"
                    placeholder="50"
                    value={product.oldPrice}
                    onChange={handleChange}
                />

                {/* Image */}

                <UploadImage
                label="Image"
                  name="image"
                  id="image"
                  value={e => setImage(e.target.value)}
                  placeholder="Upload Image"
                  setImage={setImage}      
                
                />


                {/*description*/}

                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-600'>Description</label>

                    <textarea
                        name="description"
                        id="description"
                        rows="6"
                        value={product.description}
                        onChange={handleChange}
                        className='add-product-InputCSS'
                    />
                       
                   
                </div>



                {/* Submit btn */}
                <div>
                  <button className='add-product-btn' type='submit'>Add Product Button</button>
                </div>

                </form>



    </div>
  )
}

export default AddProduct