import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/products.entity";

export const updateCreateProduct = async (product: Partial<Product>) => {

  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }

throw new Error("Product id is required");

};




const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;
 try {
   const checkImages = prepareImages(images);
   console.log(checkImages);

   const {data} = await tesloApi.patch(`/products/${id}`, {
     images: checkImages,
     ...rest,
   });

   return data;
 } catch (error) {
   
   if (isAxiosError(error)) {
    console.log(error.response?.data);
    
   }
  console.log("Error al actualizar el producto");
  
 }
 
};



const prepareImages = (images: string[]) => {
  return images.map(image => {
    image.split('/').pop();
  })
};  