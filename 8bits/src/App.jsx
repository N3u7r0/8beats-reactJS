import { LayoutMain } from "./Layout";
import { DataProvider } from "./components";

function App() {
  return (
    <>
      <DataProvider>
        <LayoutMain />
      </DataProvider>
    </>
  );
}

export default App;
