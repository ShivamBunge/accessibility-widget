import logo from './logo.svg';
import './App.css';
import TodoApp from './components/TodoApp';
import AccessibilityWidget from './components/AccessibilityWidget';

function App() {
  return (
    <div className="App">
     
      <TodoApp/>
      <AccessibilityWidget />
    </div>
  );
}

export default App;
