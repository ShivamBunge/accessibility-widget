import logo from './logo.svg';
import './App.css';
import TodoApp from './components/TodoApp';
import AccessibilityWidget from './components/AccessibilityWidget';
import Sample from './components/Sample';
function App() {
  return (
    <div className="App">
     <Sample/>
      {/* <TodoApp/> */}
      <AccessibilityWidget />
    </div>
  );
}

export default App;
