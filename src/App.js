import './App.css';

import { Button } from 'antd';
import Base from "./imgs/base";
function App() {
  return (
    <div className="App">
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
        <Base></Base>
    </div>
  );
}

export default App;