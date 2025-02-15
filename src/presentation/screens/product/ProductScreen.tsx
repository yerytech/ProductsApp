import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";

import { RootStartParams } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { getProductById } from "../../../actions/products/get-product-by-id";
import { useRef } from "react";
import { FlatList, ScrollView } from "react-native";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { Gender, Size } from "../../../domain/entities/products.entity";
import { MyIcon } from "../../components/ui/MyIcon";
const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const gender: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];
interface Props extends StackScreenProps<RootStartParams, "ProductScreen"> {}

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
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

        <ButtonGroup
          style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
          size="small"
          appearance="outline"
        >
          {sizes.map((size) => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? "#99C1F1" : undefined,
              }}
              key={size}
            >
              {size}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup
          style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
          size="small"
          appearance="outline"
        >
          {gender.map((gender) => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? "#99C1F1" : undefined,
              }}
              key={gender}
            >
              {gender}
            </Button>
          ))}
        </ButtonGroup>
        {/*Botton de Guardar  */}

        <Button
          accessoryLeft={
            <MyIcon
              name={"save-outline"}
              white
            />
          }
          style={{ margin: 15 }}
          onPress={() => console.log("guardar")}
        >
          Guardar
        </Button>
        <Layout style={{ height: 150 }} />
      </ScrollView>
    </MainLayout>
  );
};
