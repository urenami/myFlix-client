import { createRoot } from "react-dom/client";
import { MainView } from "./components/MainView/main-view";
import "./index.scss";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
