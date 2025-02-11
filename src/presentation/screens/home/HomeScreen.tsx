import { Layout, Text } from "@ui-kitten/components";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { getProdutsByPage } from "../../../actions/products/get-products-by-page";
import { useQuery } from "@tanstack/react-query";

export const HomeScreen = () => {
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProdutsByPage(0),
  });
  getProdutsByPage(1);
  const { logOut } = useAuthStore();
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(products, null, 2)}</Text>
    </Layout>
  );
};
