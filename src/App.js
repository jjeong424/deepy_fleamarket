import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import ItemDetail from "./routes/ItemDetail";
import Login from "./routes/Login";
import Navigation from "./components/Navigation";
import "./App.css";
import Upload from "./routes/Upload";
import Register from "./routes/Register";
import MyPage from "./routes/MyPage";
import Comment from './routes/Comment'
import Edit from './routes/Edit'
import EditMy from './routes/EditMy'

function App() {
  return (
    <HashRouter>
      <Navigation/>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/post/:id" component={ItemDetail}/>
      <Route path="/Login" component={Login}/>
      <Route path="/Upload" component={Upload}/>
      <Route path="/Register" component={Register}/>
      <Route path="/MyPage" component={MyPage}/>
      <Route path="/comment/:id" component={Comment} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/editmy" component={EditMy} />
    </HashRouter>
  );
}

export default App;
