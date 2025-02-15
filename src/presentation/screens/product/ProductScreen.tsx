import { Text } from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";

import { RootStartParams } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { getProductById } from "../../../actions/products/get-product-by-id";
import { useRef } from "react";

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
      <Text> pro</Text>
    </MainLayout>
  );
};
