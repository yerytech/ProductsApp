import { Button, Input, Layout ,Text} from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStartParams } from "../../navigation/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useState } from "react";
interface Props extends StackScreenProps<RootStartParams, "RegisterScreen"> {}
export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { height } = useWindowDimensions();
  const [isPosting, setIsPosting] = useState(false);

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    )
      return;
    setIsPosting(true);
    const wasSuccessful = await register(
      form.email,
      form.password,
      form.fullName
    );
    setIsPosting(false);
    if (wasSuccessful) return;
    Alert.alert("Error al registrar");
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/* Titulo */}
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            onChangeText={(value) =>
              setForm({
                ...form,
                fullName: value,
              })
            }
            value={form.fullName}
            accessoryLeft={<MyIcon name="person-outline" />}
            placeholder=" Nombre"
            style={{ marginBottom: 10 }}
          />
          <Input
            value={form.email}
            onChangeText={(value) =>
              setForm({
                ...form,
                email: value,
              })
            }
            accessoryLeft={<MyIcon name="email-outline" />}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
          <Input
            value={form.password}
            onChangeText={(value) =>
              setForm({
                ...form,
                password: value,
              })
            }
            accessoryLeft={<MyIcon name="lock-outline" />}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
        </Layout>
        {/* Espacio */}
        <Layout style={{ marginTop: 10 }} />
        {/* Botton */}
        <Layout>
          <Button
            disabled={isPosting}
            onPress={onRegister}
            accessoryRight={
              <MyIcon
                name="arrow-forward-outline"
                white
              />
            }
          >
            Crear
          </Button>
        </Layout>
        {/* Info para crear cuenta */}
        <Layout style={{ marginTop: 50 }} />
        <Layout
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text>¿Ya tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.pop()}
          >
            Ingresar
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};