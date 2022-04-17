import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import { Home } from "./sections";
import { APOD } from "./sections";
import APODArchive from "./sections/APOD/APODArchive";
import APODPhotoOfTheDay from "./sections/APOD/APODPhotoOfTheDay";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="apod" element={<APOD />}>
        <Route path="" element={<Navigate to="/apod/archive" replace />} />
        <Route path="archive" element={<APODArchive />} />
        <Route path=":date" element={<APODPhotoOfTheDay />} />
      </Route>
    </Routes>
  );
}

export default App;
