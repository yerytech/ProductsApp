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
const prepareImages = async (images: string[]) => {
  const fileImages = images.filter((image) => image.includes("file://"));
  const currentImages = images.filter((image) => !image.includes("file://"));

  if (fileImages.length > 0) {
    const uploaPromises = fileImages.map(uploadImages);
    const uploadedImages = await Promise.all(uploaPromises);
    currentImages.push(...uploadedImages);
  }

  return currentImages.map((image) => image.split("/").pop()!);
};
const uploadImages = async (image: string) => {
  const formdata = new FormData();
  const blob = new Blob([image], { type: "image/jpeg" });
  formdata.append("file", blob, image.split("/").pop());
  const { data } = await tesloApi.post<{ image: string }>("/upload", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.image;
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;

  try {
    const checkImages = await prepareImages(images);

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
    const checkImages = await prepareImages(images);

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
