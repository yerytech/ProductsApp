import { useAuthStore } from "../../store/auth/useAuthStore";
import { getProdutsByPage } from "../../../actions/products/get-products-by-page";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/Productslist";

export const HomeScreen = () => {
  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ["products", "infinite"],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProdutsByPage(0),
  // });
  // getProdutsByPage(1);
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60,

    initialPageParam: 0,
    queryFn: async (params) => {
      console.log({ params });

      return await getProdutsByPage(params.pageParam);
    },
    getNextPageParam: (lastpage, allPages) => allPages.length,
  });
  getProdutsByPage(1);
  const { logOut } = useAuthStore();
  return (
    <MainLayout
      title="TesloShop - Productos"
      subtitle="Aplicacion admin"
    >
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList
          fechNextPage={fetchNextPage}
          products={data?.pages.flat() ?? []}
        />
      )}
    </MainLayout>
  );
};
