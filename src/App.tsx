import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from '@/routes/Root';

// containers
import Login from '@/containers/login';
import Register from '@/containers/register';
import Home from '@/containers/home';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
