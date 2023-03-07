// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductType } from '../types/productType';

const BASE_URL = 'https://api.jsonbin.io/v3/b/63fd8e32ebd26539d0869bd9';

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jsonbin.io/v3/',
  }),
  endpoints: builder => ({
    getAllProducts: builder.query<ProductType[], void>({
      query: () => 'b/63fd8e32ebd26539d0869bd9',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = productApi;
