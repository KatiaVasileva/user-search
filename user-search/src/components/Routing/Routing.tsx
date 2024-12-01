import { Route, Routes } from "react-router-dom";
import SearchPage from "../../pages/SearchPage";
import UserPage from "../../pages/UserPage";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </>
  );
}
