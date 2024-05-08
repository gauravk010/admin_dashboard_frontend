import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/Pages/Dashboard/Dashboard";
import { Layout } from "./Components/shared/Layout";
import { Login } from "./Components/shared/Login";
import { Register } from "./Components/shared/Register";
import AuthWrap from "./Components/Auth/AuthWrap";
import LogWrap from "./Components/Auth/LogWrap";
import { PageNotFound } from "./Components/Pages/PageNotFound";
import { Product } from "./Components/Pages/Product/Product";
import AddProduct from "./Components/Pages/Product/AddProduct";
import { Order } from "./Components/Pages/Orders/Order";
import { User } from "./Components/Pages/Users/User";
import AddUser from "./Components/Pages/Users/AddUser";
import { Profile } from "./Components/Pages/Profile/Profile";
import EditProduct from "./Components/Pages/Product/EditProduct";
import EditUser from "./Components/Pages/Users/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LogWrap />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthWrap />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="products/add-product" element={<AddProduct />} />
            <Route path="products/edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<Order />} />
            <Route path="users" element={<User />} />
            <Route path="users/add-user" element={<AddUser />} />
            <Route path="users/edit-user/:id" element={<EditUser />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
