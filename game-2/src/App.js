import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/HomePage/HomePage";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { DetailsPage } from "./components/DetailsPage/DetailsPage";
import { EditPage } from "./components/EditPage/EditPage";
import { CreatePage } from "./components/CreatePage/CreatePage";
import { Catalog } from "./components/Catalog/Catalog";
import { GameProvider } from "./contexts/gameContext";
import { AuthProvider } from "./contexts/authContext";
import { Profile } from "./components/UserProfile/UserProfile";
import { UserEdit } from "./components/UserEdit/UserEdit";
import { ErrorPage } from "./components/Errors/ErrorPage";
import { NotFound } from "./components/Errors/NotFound"


function App() {
  return (
   
      <AuthProvider>
        <div id="box">
          <GameProvider>
            <Header />

            <main id="main-content">
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/user/edit/:id' element={<UserEdit />} />
                <Route path='/details/:id' element={<DetailsPage />} />
                <Route path='/edit/:id' element={<EditPage />} />
                <Route path='/create' element={<CreatePage />} />
                <Route path='/catalog' element={<Catalog />} />
                <Route path='/errors' element={<ErrorPage />} />
                <Route path='/notfound' element={<NotFound />} />
              </Routes>
            </main>
          </GameProvider>
        </div>
      </AuthProvider>
   
  );
}

export default App;
