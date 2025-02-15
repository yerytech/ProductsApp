import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/products.entity";
import { TesloProduct } from "../../infrastructure/interfacea/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mapper/product.mapper";

export const getProductById = async (id: string):Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`)
    
    return ProductMapper.tesloProductToEntiTy(data);
  } catch (error) {
    console.log(error);
     throw new Error(`Error al obtener productor po id: ${id}`);
     
  }
}