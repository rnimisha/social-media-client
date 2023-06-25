import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';

function App(): JSX.Element {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
