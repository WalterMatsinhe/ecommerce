import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

// AdminProductTile component with better visibility and styling
function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete
}) {
  const handleEdit = () => {
    setFormData({
      ...product,
      image: product.image || null,
    });
    setCurrentEditedId(product._id || product.id);
    setOpenCreateProductsDialog(true);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      handleDelete(product._id || product.id);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        {/* Product Image */}
        <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title || 'Product image'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          {!product.image && (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {product.title || 'Untitled Product'}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description || 'No description available'}
          </p>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-lg text-gray-900">
                ${product.price || '0.00'}
              </p>
              {product.salePrice && product.salePrice !== product.price && (
                <p className="text-sm text-green-600">
                  Sale: ${product.salePrice}
                </p>
              )}
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Stock: {product.totalStock || 0}</p>
              <p className="capitalize">{product.category || 'No Category'}</p>
              <p className="capitalize">{product.brand || 'No Brand'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button
            size="sm"
            variant="outline"
            onClick={handleEdit}
            className="flex-1 hover:bg-gray-50"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDeleteClick}
            className="flex-1 bg-red-600 text-white border-3 border-black"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { productList, isLoading: storeLoading } = useSelector((state) => state.adminProducts || {});
  const dispatch = useDispatch();

  // Form validation
  const isFormValid = useCallback(() => {
    const requiredFields = ['title', 'description', 'category', 'brand', 'price', 'totalStock'];
    return requiredFields.every((field) => {
      const value = formData[field];
      return value !== "" && value !== null && value !== undefined && String(value).trim() !== "";
    });
  }, [formData]);

  // Handle form submission
  const onSubmit = useCallback((event) => {
    event.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const submitData = {
      ...formData,
      image: uploadedImageUrl || formData.image,
      price: parseFloat(formData.price) || 0,
      salePrice: parseFloat(formData.salePrice) || parseFloat(formData.price) || 0,
      totalStock: parseInt(formData.totalStock) || 0,
    };

    const action = currentEditedId !== null
      ? editProduct({ id: currentEditedId, formData: submitData })
      : addNewProduct(submitData);

    dispatch(action)
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          handleCloseDialog();

          toast.success(
            currentEditedId !== null
              ? "Product updated successfully"
              : "Product added successfully"
          );
        } else {
          toast.error(
            data?.payload?.message ||
            "Something went wrong. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting product:", error);
        toast.error("Failed to save product. Please try again.");
      });
  }, [formData, uploadedImageUrl, currentEditedId, dispatch, isFormValid]);

  // Handle product deletion
  const handleDelete = useCallback((getCurrentProductId) => {
    if (!getCurrentProductId) {
      toast.error("Invalid product ID");
      return;
    }

    dispatch(deleteProduct(getCurrentProductId))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          toast.success("Product deleted successfully");
        } else {
          toast.error("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product. Please try again.");
      });
  }, [dispatch]);

  // Handle dialog close
  const handleCloseDialog = useCallback(() => {
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
  }, []);

  // Load products on component mount
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAllProducts())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setIsLoading(false);
      });
  }, [dispatch]);

  // Show loading state
  if (isLoading || storeLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product inventory
          </p>
        </div>
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-green-600 hover:bg-green-500 border-2 border-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="w-full">
        {productList && Array.isArray(productList) && productList.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {productList.length} product{productList.length !== 1 ? 's' : ''}
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {productList.map((productItem, index) => (
                <AdminProductTile
                  key={productItem._id || productItem.id || `product-${index}`}
                  product={productItem}
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">No products yet</h3>
                <p className="text-gray-600 mt-1">Get started by adding your first product to the catalog.</p>
              </div>
              <Button
                onClick={() => setOpenCreateProductsDialog(true)}
                className="mt-4 bg-green-600 hover:bg-green-500 border-2 border-black"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Sheet */}
      <Sheet open={openCreateProductsDialog} onOpenChange={handleCloseDialog}>
        <SheetContent side="right" className="flex flex-col h-full overflow-y-auto bg-white border-l border-gray-200 shadow-2xl w-[400px] sm:w-[540px] z-[100]">
          <SheetHeader className="space-y-2 pb-4">
            <SheetTitle className="text-2xl flex items-center justify-center font-bold text-gray-900">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription className="text-gray-600 text-center">
              {currentEditedId !== null
                ? "Make changes to your product information below."
                : "Fill in the product details to add a new item to your catalog."
              }
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 m-2">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            
            <div className="form-container">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter product title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-2-primary focus:text-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-2-primary focus:text-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2focus:ring-2-primary focus:text-primary bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwear">Footwear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <select
                    value={formData.brand || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2focus:ring-2-primary focus:text-primary bg-white"
                    required
                  >
                    <option value="">Select Brand</option>
                    <option value="nike">Nike</option>
                    <option value="adidas">Adidas</option>
                    <option value="puma">Puma</option>
                    <option value="levis">Levi's</option>
                    <option value="lacoste">Lacoste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter product price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-2-primary focus:text-primary"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
                    placeholder="Enter sale price (optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-2-primary focus:text-primary"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Stock *
                  </label>
                  <input
                    type="number"
                    value={formData.totalStock || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalStock: e.target.value }))}
                    placeholder="Enter total stock quantity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-2-primary focus:text-primary"
                    min="0"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!isFormValid() || imageLoadingState}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {currentEditedId !== null ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminProducts;