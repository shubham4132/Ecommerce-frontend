import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { RootState } from "@/store/store";

import ProductImageUpload from "components/admin-view/image-upload";
import AdminProductTile from "components/admin-view/product-tile";
import CommonForm from "components/common/form";
import { Button } from "components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "components/ui/sheet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector(
    (state: RootState) => state.adminProducts
  );
  console.log(currentEditedId, "currentEditedId");
  const dispatch = useDispatch();
  function onSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        console.log(data, "edit");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
        (data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Product Added Successfully");
          }
        }
      );
    }
  }
  function handleDelete(getCurrentProductId: string) {
    console.log(getCurrentProductId, "deleteProductId");
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
    toast.success("Product Deleted Successfully");
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, "productList");
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          {currentEditedId !== null ? "Edit Product" : "Add New Product"}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <AdminProductTile
                key={index}
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
export default AdminProducts;
