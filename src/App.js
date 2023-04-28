
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Posts } from './pages/Posts';
import { UserList } from './pages/UserList';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/posts" element={ <Posts /> } />
        <Route path="/users" element={ <UserList /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
