import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/products.entity";
import { TesloProduct } from "../../infrastructure/interfacea/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mapper/product.mapper";

export const getProdutsByPage = async (
  page: number,
  limit: number = 20
): Promise<Product[]> => {
  console.log({ page, limit });

  try {
    const { data } = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`
    );
    const products = data.map((tesloProduct) =>
      ProductMapper.tesloProductToEntiTy(tesloProduct)
    );

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting products");
  }
};
