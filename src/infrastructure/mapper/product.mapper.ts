import { API_URL } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/products.entity";
import type{ TesloProduct } from "../interfacea/teslo-products.response";

export class ProductMapper {
 
  static tesloProductToEntiTy(tesloProduct:TesloProduct):Product {
    return {
      id: tesloProduct.id,
      title: tesloProduct.title,
      price: tesloProduct.price,
      description: tesloProduct.description,
      slug: tesloProduct.slug,
      stock: tesloProduct.stock,
      sizes: tesloProduct.sizes,
      gender: tesloProduct.gender,
      tags: tesloProduct.tags,
      images: tesloProduct.images.map(
        (image) => `${API_URL}/files/product/${image}`
      ),
    };
}














}