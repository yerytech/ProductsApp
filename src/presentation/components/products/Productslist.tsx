interface Prop {
  products: Product[];
  //todo: fetch nect page
  fechNextPage: () => void;
}

import { Product } from "../../../domain/entities/products.entity";
import { Layout, List } from "@ui-kitten/components";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { RefreshControl } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
export const ProductList = ({ products, fechNextPage }: Prop) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
    setIsRefreshing(false);
  };
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fechNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onPullToRefresh}
        />
      }
    />
  );
};
