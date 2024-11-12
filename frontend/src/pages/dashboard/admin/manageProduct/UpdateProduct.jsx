import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import SelectInput from '../addProduct/SelectInput';
import TextInput from '../addProduct/TextInput';
import UploadImage from '../addProduct/UploadImage';


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


const UpdateProduct = () => {

    const { id } = useParams();
    const { user } = useSelector(state => state.auth)
     const navigate = useNavigate()


    const { data, isLoading: isProductLoading, error, refetch } = useFetchProductByIdQuery(id);
  
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation()



    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        color: '',
        image: ''
    })
   // console.log(data.product)
    const [newImage, setNewImage] = useState(null);
    const productData = data?.product || {}
    const { name, category, color, description, image: imageURL, price } = productData || {};

    useEffect(() => {
        if (productData ) {
            setProduct({
                name: name ||'',
                category: category ||'',
                description: description ||'',
                price: price ||'',
                color: color ||'',
                image: imageURL || ''
            })
        }
    }, [productData ]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleImageChange = (image) => {
        setNewImage(image)
    }

 if (isProductLoading) return <Loading />;
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...product,
            image: newImage ? newImage: product.image,
            author: user?._id
        }

        try {
            await updateProduct({id: id, ...updatedProduct}).unwrap();
            alert('Product updated successfully!');
            await refetch();
            navigate("/dashboard/manage-products")
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    }


  return (
   
    <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-6">Update Product</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* product name */}
        <TextInput
            label="Product Name"
            name="name"
            placeholder="Ex: Diamond Earrings"
            value={product.name}
            onChange={handleChange}
        />

        {/* category */}
        <SelectInput
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            options={categories}
        />

        {/* color */}
        <SelectInput
            label="Color"
            name="color"
            value={product.color}
            onChange={handleChange}
            options={colors}
        />

        {/* price */}
        <TextInput
            label="Price"
            name="price"
            type="number"
            placeholder="50"
            value={product.price}
            onChange={handleChange}
        />

        {/* image upload */}
        <UploadImage
            name="image"
            id="image"
            value={newImage || product.image} 
            setImage={handleImageChange} 
            placeholder='Upload a product image'
        />

        {/* description */}
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <textarea
                rows={6}
                name="description"
                id="description"
                value={product.description}
                placeholder='Write a product description'
                onChange={handleChange}
                className="add-product-InputCSS"
            />
        </div>

        <div>
            <button
                type="submit"
                className="add-product-btn"
               
            >
               Update
            </button>
        </div>
    </form>

</div>


  )
}

export default UpdateProduct