import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RootStartParams } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { getProductById } from "../../../actions/products/get-product-by-id";
import { useRef } from "react";
import { FlatList, ScrollView } from "react-native";
import { FadeInImage } from "../../components/ui/FadeInImage";
import {
  Gender,
  Product,
  Size,
} from "../../../domain/entities/products.entity";
import { MyIcon } from "../../components/ui/MyIcon";
import { Formik } from "formik";
import { updateCreateProduct } from "../../../actions/products/update-create-products";
const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const gender: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];
interface Props extends StackScreenProps<RootStartParams, "ProductScreen"> {}

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { data: values } = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({ queryKey: ["product", "infinite"] });
      queryClient.invalidateQueries({ queryKey: ["product", data.id] });
    },
  });

  if (!values?.id) {
    return <MainLayout title="Cargando...." />;
  }

  return (
    <Formik
      initialValues={values}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout
          subtitle={`Precio:${values!.price}`}
          title={values!.title}
        >
          <ScrollView style={{ flex: 1 }}>
            {/* Imagen del producto */}
            <Layout>
              <FlatList
                keyExtractor={(item) => item}
                data={values.images}
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
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <Input
                label={"Slug"}
                value={values.slug}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("slug")}
              />
              <Input
                label={"Description"}
                value={values.description}
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("description")}
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
                keyboardType="numeric"
                label={"Precio"}
                value={values.price.toString()}
                style={{ flex: 1 }}
                onChangeText={handleChange("price")}
              />
              <Input
                keyboardType="numeric"
                label={"Inventario"}
                value={values.stock.toString()}
                style={{ flex: 1 }}
                onChangeText={handleChange("stock")}
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
                  onPress={() =>
                    setFieldValue(
                      "sizes",
                      values.sizes.includes(size)
                        ? values.sizes.filter((s) => s !== size)
                        : [...values.sizes, size]
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? "#99C1F1"
                      : undefined,
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
                  onPress={() => setFieldValue("gender", gender)}
                  style={{
                    flex: 1,
                    backgroundColor:
                      values.gender === gender ? "#99C1F1" : undefined,
                  }}
                  key={gender}
                >
                  {gender}
                </Button>
              ))}
            </ButtonGroup>
            {/*Botton de Guardar  */}

            <Button
              disabled={mutation.isPending}
              accessoryLeft={
                <MyIcon
                  name={"save-outline"}
                  white
                />
              }
              style={{ margin: 15 }}
              onPress={() => handleSubmit()}
            >
              Guardar
            </Button>
            <Layout style={{ height: 150 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
