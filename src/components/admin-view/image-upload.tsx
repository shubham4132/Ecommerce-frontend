import axios from "axios";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Skeleton } from "components/ui/skeleton";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
type ProductImageUploadProps = {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  uploadedImageUrl: string;
  setUploadedImageUrl: (url: string) => void;
  imageLoadingState: boolean;
  setImageLoadingState: (state: boolean) => void;
};

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile, "selectedFile");
    if (selectedFile) setImageFile(selectedFile);
  }
  function handelDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadImageToCloudinary() {
    if (!imageFile) return;
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    if (response?.data?.success) {
      setUploadedImageUrl(response?.data?.result?.url);
      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md max-auto mt-4">
      <Label className="text-lg font-semibold mb-2 bold">Upload Image</Label>
      <div
        onDragOver={handelDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductImageUpload;
