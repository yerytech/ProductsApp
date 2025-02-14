interface Prop{
  products: Product[];
  //todo: fetch nect page
}

import { Product } from '../../../domain/entities/products.entity';
import { Layout, List, Text } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
   export const ProductList = ({products}:Prop) => { 
 return (
   <List
     data={products}
     numColumns={2}
     keyExtractor={(item, index) => `${item.id}-${index}`}
     renderItem={({ item }) =>(  <ProductCard product={item}/>
          )
     }
     ListFooterComponent={() => <Layout style={ {height:150}} />}
   
   />
 );
};