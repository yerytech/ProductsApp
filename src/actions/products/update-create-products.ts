import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/products.entity";

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};
const prepareImages = (images: string[]) => images;
const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;

  try {
    const checkImages = prepareImages(images);

    const { data } = await tesloApi.patch(`/products/${id}`, {
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

const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;

  try {
    const checkImages = prepareImages(images);

    const { data } = await tesloApi.post(`/products/`, {
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
