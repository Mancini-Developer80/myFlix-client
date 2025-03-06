import Container from "react-bootstrap/Container";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/MainView";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container className="my-auto">
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
