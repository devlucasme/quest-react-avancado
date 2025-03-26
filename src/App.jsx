import { useContext } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from './pages/Routes/Routes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeConsumerApp />
      </Router>
    </ThemeProvider>
  );
}

const ThemeConsumerApp = () => {
  
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <GlobalStyles theme={theme} />
      <AppRoutes />
    </>
  );
};

export default App;
