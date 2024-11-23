


import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const initialState = {

    products: [],
    selectedItems: 0 ,
    totalPrice: 0,
    discoun: 0,
    discountRate:0 ,
    grandTotal:0


}

const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state,action) => {

            const isExist = state.products.find((product)=> product._id === action.payload._id)

            if(!isExist){
                state.products.push({...action.payload , quantity: 1})
            }else{
                Swal.fire({
                    title: 'Product already added',
                    text: 'Try add another product',
                    icon: 'info',
                    confirmButtonText: 'Cool'
                  })
            };
            
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discoun = setDiscoun(state);
            state.grandTotal = setGrandTotal(state);

        },
        updateTaxRate: (state, action) => {
          state.discountRate = action.payload; // Update the tax rate
          state.discoun = setDiscoun(state); // Recalculate tax
          state.grandTotal = setGrandTotal(state); // Recalculate grand total
      },

        updateQuantity:(state, action)=>{
            const products = state.products.map((product)=>{
                if(product._id === action.payload.id){
                    if(action.payload.type == "increment"){
                        product.quantity  += 1 ;
                    }else if(action.payload.type == 'decrement'){
                        if(product.quantity > 1){
                            product.quantity -= 1 ;
                        }
                    }
                }

                return product ;
              })

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discoun = setDiscoun(state);
            state.grandTotal = setGrandTotal(state);
        },

        removeFromCart: (state , action) => {

            state.products = state.products.filter((product)=> product._id !== action.payload.id);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discoun = setDiscoun(state);
            state.grandTotal = setGrandTotal(state);
        },
        clearCart:(state)=> {
            state.products= [],
            state.selectedItems= 0 ,
            state.totalPrice= 0,
            state.discoun= 0,
            state.discountRate=0 ,
            state.grandTotal=0
        }

    },


});


export const setSelectedItems = (state) => state.products.reduce((total , product) => {


    return Number(total + product.quantity);
} , 0)

    // ================ //

export const setTotalPrice = (state) => state.products.reduce((total , product) => {


    return Number(total + product.quantity*product.price);
} , 0)

   // ================ // 

export const setDiscoun = (state) => setTotalPrice(state) * state.discountRate ;


   // ================ // 

export const setGrandTotal = (state) => {
    return setTotalPrice(state) - setTotalPrice(state) * state.discountRate ;
}   



export const { addToCart,updateQuantity,removeFromCart,clearCart, updateTaxRate } = cartSlice.actions ;

export default cartSlice.reducer;




{/*
import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const initialState = {

    products: [],
    selectedItems: 0 ,
    totalPrice: 0,
    discounted: 0,
    discountRate: 0,  
    grandTotal:0


}

const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state,action) => {

            const isExist = state.products.find((product)=> product._id === action.payload._id)

            if(!isExist){
                state.products.push({...action.payload , quantity: 1})
            }else{
                Swal.fire({
                    title: 'Product already added',
                    text: 'Try add another product',
                    icon: 'info',
                    confirmButtonText: 'Cool'
                  })
            };
          
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discounted = setDiscounted(state);
            state.grandTotal = setGrandTotal(state);

        },

//// update discount rate

applyDiscountRate: (state, action) => {
  state.discountRate = action.payload / 100; // Convert percentage to decimal
  const discount = setTotalPrice(state) * state.discountRate; // Calculate discount
  state.grandTotal = setTotalPrice(state) - discount; // Update grand total after discount
},

        updateQuantity:(state, action)=>{
            const products = state.products.map((product)=>{
                if(product._id === action.payload.id){
                    if(action.payload.type == "increment"){
                        product.quantity  += 1 ;
                    }else if(action.payload.type == 'decrement'){
                        if(product.quantity > 1){
                            product.quantity -= 1 ;
                        }
                    }
                }

                return product ;
              })

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discounted = setDiscounted(state);
            state.grandTotal = setGrandTotal(state);
        },

        removeFromCart: (state , action) => {

            state.products = state.products.filter((product)=> product._id !== action.payload.id);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discounted = setDiscounted(state);
            state.grandTotal = setGrandTotal(state);
        },
        clearCart:(state)=> {
            state.products= [],
            state.selectedItems= 0 ,
            state.totalPrice= 0,
            state.discounted= 0,
            state.discountRate=0 ,
            state.grandTotal=0
        }

    },


});


export const setSelectedItems = (state) => state.products.reduce((total , product) => {


    return Number(total + product.quantity);
} , 0)

    // ================ //

export const setTotalPrice = (state) => state.products.reduce((total , product) => {


    return Number(total + product.quantity*product.price);
} , 0)

   // ================ // 

   export const setDiscounted = (state) => setTotalPrice(state) * state.discountRate;
  
   // ================ // 

export const setGrandTotal = (state) => {
    const discount = setTotalPrice(state) * (state.discountRate || 0); // Calculate the discount
    return setTotalPrice(state) - discount; // Subtract the discount from the total price
};




export const { addToCart,updateQuantity,removeFromCart,clearCart,applyDiscountRate } = cartSlice.actions ;

export default cartSlice.reducer;






 
    ///////////////////////////////
    
    
   // This code from chatgpt fro not to remove cart item while refreshing 
import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

// Utility function to load cart state from localStorage
const loadCartState = () => {
  const savedState = localStorage.getItem('cart');
  if (savedState) {
    return JSON.parse(savedState); // Parse and return the saved state
  }
  return {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    discount: 0,
    taxRate: 0.05,
    grandTotal: 0
  };
};

// Initial state from localStorage
const initialState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((product) => product._id === action.payload._id);
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        Swal.fire({
          title: 'Product already added',
          text: 'Try add another product',
          icon: 'info',
          confirmButtonText: 'Cool'
        });
      }

      // Recalculate the state values
      updateCartState(state);
    },

    updateQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === 'decrement' && product.quantity > 1) {
            product.quantity -= 1;
          }
        }
        return product;
      });

      // Recalculate the state values
      updateCartState(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload.id);

      // Recalculate the state values
      updateCartState(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.taxRate = 0;
      state.grandTotal = 0;

      // Recalculate the state values
      updateCartState(state);
    }
  }
});

// Helper functions to recalculate cart values
const updateCartState = (state) => {
  state.selectedItems = setSelectedItems(state);
  state.totalPrice = setTotalPrice(state);
  state.tax = discount(state);
  state.grandTotal = setGrandTotal(state);

  // Save the updated state to localStorage
  localStorage.setItem('cart', JSON.stringify(state));
};

export const setSelectedItems = (state) => state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) => state.products.reduce((total, product) => total + product.quantity * product.price, 0);

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

    
    
    
    
    
    
    
    */}