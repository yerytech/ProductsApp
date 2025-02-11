import { Button, Input, Layout ,Text} from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStartParams } from "../../navigation/StackNavigator";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
interface Props extends StackScreenProps<RootStartParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isPosting, setIsPosting] = useState(false);
  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) return;
    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccessful) return;
    Alert.alert("Error", "Credenciales incorrectas");
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/* Titulo */}
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese sus credenciales</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            accessoryLeft={<MyIcon name="email-outline" />}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            style={{ marginBottom: 10 }}
          />
          <Input
            accessoryLeft={<MyIcon name="lock-outline" />}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            style={{ marginBottom: 10 }}
          />
        </Layout>
        {/* Espacio */}
        <Layout style={{ marginTop: 10 }} />
        {/* Botton */}
        <Layout>
          <Button
            disabled={isPosting}
            onPress={onLogin}
            accessoryRight={
              <MyIcon
                name="arrow-forward-outline"
                white
              />
            }
          >
            Ingresar
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
          <Text>¿No tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Registrate
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};