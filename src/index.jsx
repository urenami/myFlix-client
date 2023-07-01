import { createRoot } from "react-dom/client";
import { MainView } from "./components/MainView/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const MyFlixApp = () => {
  return (
    <Container>
       <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApp />);