import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type ProductFormData = {
  image: File | null;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
};

type AdminProductsState = {
  isLoading: boolean;
  productList: ProductFormData[];
};

const initialState: AdminProductsState = {
  isLoading: false,
  productList: [],
};
type AddProductPayload = {
  image: string | null;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
};

type EditProductPayload = {
  id: string;
  formData: AddProductPayload;
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData: AddProductPayload) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }: EditProductPayload) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id: string) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
