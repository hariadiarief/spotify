import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { publicRoutes } from "./routes";
import { AppProvider } from "@/contexts/appContext";
import { useAppContext } from "@/contexts/appContext";

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

const Main = () => {
  const { isDark } = useAppContext();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <div className="w-full max-w-[768px] mx-auto  min-h-screen  md:shadow-xl">
      <ConfigProvider
        theme={{
          algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <RouterProvider router={publicRoutes} />
      </ConfigProvider>
    </div>
  );
};

export default App;
