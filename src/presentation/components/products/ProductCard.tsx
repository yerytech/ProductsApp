
import { Product } from "../../../domain/entities/products.entity";
import { Image } from "react-native";

interface Prop {
  product: Product;
}


export const ProductCard = ({ product }: Prop) => { 
     console.log(product.images);
     
     return (
     
   
   <Image source={{ uri: product.images[0] }}
   style={{width:250 , height:250}}
   />
 );
};