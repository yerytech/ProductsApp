import { Layout, Text } from "@ui-kitten/components";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { getProdutsByPage } from "../../../actions/products/get-products-by-page";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";

export const HomeScreen = () => {
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProdutsByPage(0),
  });
  getProdutsByPage(1);
  const { logOut } = useAuthStore();
  return (
    <MainLayout
      title="TesloShop - Productos"
      subtitle="Aplicacion admin"
    >
      <Text>Hola</Text>
    </MainLayout>
  );
};
