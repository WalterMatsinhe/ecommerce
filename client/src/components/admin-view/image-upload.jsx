import React, { useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { UploadCloudIcon, XIcon, FileIcon, ImageIcon, Loader} from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

function ProductImageUpload({ imageFile, setImageFile, imageLoadingState ,setImageLoadingState, uploadedImageUrl, setUploadedImageUrl}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null);
    if (inputRef.current) inputRef.current.value = '';
  }

async function uploadImageToCloudinary() {
  setImageLoadingState(true)
  const data = new FormData();
  data.append('my_file', imageFile);

    setUploading(true);

    const response = await axios.post(
      'http://localhost:5000/api/admin/products/upload-image',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    // ✅ Match the backend key "url"
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  
}


  useEffect(() => {
    if (imageFile !== null)  uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className='w-full max-w-md mx-auto mt-4'>
      <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className='border-2 border-dashed rounded-lg p-1 -mb-2'
      >
        <Input
          id='image-upload'
          type='file'
          className='hidden'
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor='image-upload'
            className='flex flex-col items-center justify-center h-32 cursor-pointer'
          >
            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (//file alrady available
          imageLoadingState ?
          <Loader className='h-10 bg-gray-100'/> : 
          <div className='flex items-center justify-between px-2 py-1'>
            <div className='flex items-center'>
              <FileIcon className='w-7 h-8 text-primary mr-2' />
              <p className='text-sm font-medium'>{imageFile.name}</p>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='text-muted-foreground hover:text-foreground'
              onClick={handleRemoveImage}
            >
              <XIcon className='w-4 h-4' />
              <span className='sr-only'>Remove File</span>
            </Button>
          </div>
        )}
      </div>

      {/* Optional Image Preview */}
      {uploadedImageUrl && (
        <div className='mt-4'>
          <Label className='mb-1 block'>Preview</Label>
          <img
            src={uploadedImageUrl}
            alt='Uploaded Preview'
            className='w-full h-auto rounded-md border'
          />
        </div>
      )}

      {uploading && (
        <p className='text-sm text-muted-foreground mt-2'>Uploading image...</p>
      )}
    </div>
  );
}

export default ProductImageUpload;
