import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { ProductType, CartItemProps } from '../types/productType';
import { getAllProducts } from './asyncthunk';

interface ProductState {
  product: ProductType[];
  isLoading: boolean;
  isError: boolean;
  isMenuOpen: boolean;
  productQuantity: number;
  cartItems: CartItemProps[];
}

const initialState: ProductState = {
  product: [],
  isLoading: false,
  isError: false,
  isMenuOpen: false,
  productQuantity: 1,
  cartItems: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },

    // set product
    setProduct: (state, action: PayloadAction<ProductType[]>) => {
      state.product = action.payload;
    },

    // quantity increment and decrement based on payload
    setProductQuantity: (state, action: PayloadAction<number>) => {
      state.productQuantity = action.payload;
    },

    // add Cart items
    addCartItems: (state, action: PayloadAction<any>) => {
      const { id, name, price, image, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);

      if (item && item.quantity !== undefined) {
        item.quantity += quantity;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },

    // remove all cart items
    removeCartItems: state => {
      state.cartItems = [];
    },

    // change cartItems quantity based on payload "plus" or "minus
    changeCartItemsQuantity: (
      state,
      action: PayloadAction<{ id: number; type: string }>
    ) => {
      const { id, type } = action.payload;

      const item = state.cartItems.find(item => item.id === id);

      if (item && item.quantity !== undefined) {
        if (type === 'plus') {
          item.quantity += 1;
        } else if (type === 'minus') {
          item.quantity -= 1;
        }
      }
      // remove item if quantity is 0
      if (item && item.quantity === 0) {
        state.cartItems = state.cartItems.filter(item => item.id !== id);
      }
    },

    // sort product by name
    sortByNewProduct: state => {
      state.product.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      const { record } = action.payload;
      state.product = record || [];
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getAllProducts.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {
  setIsMenuOpen,
  sortByNewProduct,
  setProductQuantity,
  addCartItems,
  removeCartItems,
  changeCartItemsQuantity,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
