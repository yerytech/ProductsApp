import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/products.entity";
import { TesloProduct } from "../../infrastructure/interfacea/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mapper/product.mapper";

const producto: Product = {
  id: "",
  title: "Producto nuevo",
  price: 0,
  description: "",
  slug: "",
  stock: 0,
  sizes: [],
  gender: Gender.Unisex,
  tags: [],
  images: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === "new") return producto;

  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);

    return ProductMapper.tesloProductToEntiTy(data);
    return producto;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al obtener productor po id: ${id}`);
  }
};