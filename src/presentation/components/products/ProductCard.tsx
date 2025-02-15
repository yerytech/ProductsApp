
import { Card, Text } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/products.entity";
import { Image } from "react-native";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStartParams } from "../../navigation/StackNavigator";

interface Prop {
  product: Product;
}

export const ProductCard = ({ product }: Prop) => {
  const navigation = useNavigation<NavigationProp<RootStartParams>>();

  return (
    <Card
      onPress={() =>
        navigation.navigate("ProductScreen", { productId: product.id })
      }
      style={{ flex: 1, backgroundColor: "#f9f9f9", margin: 3 }}
    >
      {product.images.length === 0 ? (
        <Image
          source={require("../../../assets/no-product-image.png")}
          style={{ width: "100%", height: 200 }}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{
            flex: 1,
            height: 200,
            width: "100%",
          }}
        />
      )}

      <Text
        numberOfLines={2}
        style={{ textAlign: "center" }}
      >
        {product.title}
      </Text>
    </Card>
  );
};