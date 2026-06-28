import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Compose from './page/Compose/Compose';
import Landing from './page/Landing/Landing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/compose" element={<Compose />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
