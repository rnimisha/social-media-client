import Logout from '@/containers/Logout';
import Home from '@/containers/home';
import Login from '@/containers/login';
import Register from '@/containers/register';

import { Routes, Route } from 'react-router-dom';
import Message from '@/containers/message';
import Profile from '@/containers/profile';
import Setting from '@/containers/setting';
import SinglePost from '@/containers/singlePost';
import Root from './Root';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/post/:username/:postid" element={<SinglePost />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
