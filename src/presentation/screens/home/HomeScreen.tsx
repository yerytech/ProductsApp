import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from "../../store/auth/useAuthStore";

export const HomeScreen = () => {
  const { logOut } = useAuthStore();
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen</Text>

      <Button
        onPress={logOut}
        accessoryLeft={<Icon name="log-out-outline" />}
      >
        <Text>Cerrar session</Text>
      </Button>
    </Layout>
  );
};