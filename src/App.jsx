import RoadmapApp from "./Roadmap";
import { CheckProvider } from "./context/CheckProvider";

const App = () => (
  <CheckProvider>
    <RoadmapApp />
  </CheckProvider>
);

export default App;
