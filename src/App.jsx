import './App.css'
import Sidebar from './components/Sidebar'
import CalendarPage from './pages/CalendarPage'

function App() {

  const toggleDark = () => {
    document.body.classList.toggle('dark');
  };
  <button onClick={toggleDark} style={{ position: 'absolute', top: 10, right: 20 }}>
  🌓 Toggle Theme
</button>

  return (
    <div className="app-container">
  <Sidebar />
  <div className="calendar-container">
    <CalendarPage />
  </div>
</div>

  )
}

export default App
