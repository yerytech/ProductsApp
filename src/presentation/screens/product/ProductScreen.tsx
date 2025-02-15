import { Input, Layout, Text } from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";

import { RootStartParams } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { getProductById } from "../../../actions/products/get-product-by-id";
import { useRef } from "react";
import { FlatList, ScrollView } from "react-native";
import { FadeInImage } from "../../components/ui/FadeInImage";

interface Props extends StackScreenProps<RootStartParams, "ProductScreen"> {}

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);

  const { data: product } = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  if (!product?.id) {
    return <MainLayout title="Cargando...." />;
  }

  return (
    <MainLayout
      subtitle={`Precio:${product!.price}`}
      title={product!.title}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* Imagen del producto */}
        <Layout>
          <FlatList
            keyExtractor={(item) => item}
            data={product.images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{
                  width: 300,
                  height: 300,
                  marginHorizontal: 8,
                  borderRadius: 30,
                  shadowColor: "fff",

                  shadowOffset: {
                    width: 2,
                    height: -20,
                  },
                }}
              />
            )}
          />
        </Layout>
        {/* formularios */}

        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label={"Titulo"}
            value={product.title}
            style={{ marginVertical: 5 }}
          />
          <Input
            label={"Slug"}
            value={product.slug}
            style={{ marginVertical: 5 }}
          />
          <Input
            label={"Description"}
            value={product.description}
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </Layout>
        <Layout
          style={{
            marginVertical: 5,
            marginHorizontal: 15,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Input
            label={"Precio"}
            value={product.price.toString()}
            style={{ flex: 1 }}
          />
          <Input
            label={"Inventario"}
            value={product.stock.toString()}
            style={{ flex: 1 }}
          />
        </Layout>

        {/* selectores  */}

        <Layout style={{ height: 150 }} />
      </ScrollView>
    </MainLayout>
  );
};
