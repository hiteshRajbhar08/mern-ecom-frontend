import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
};

export default App;
