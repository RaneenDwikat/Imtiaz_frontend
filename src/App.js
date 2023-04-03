
import background from './images/header-background.jpg';

import './App.css';
import Login from './component/login';
function App() {

  return (
    
    <div className="App">
      
        <img src={background} className="background" alt="logo" />
        <Login/>
    </div>
  );
}

export default App;
