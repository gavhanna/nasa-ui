import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import { Home } from "./sections";
import { APOD } from "./sections";
import APODArchive from "./sections/APOD/APODArchive";
import APODPhotoOfTheDay from "./sections/APOD/APODPhotoOfTheDay";
import dayjs from "dayjs";
import { DATE_FORMAT } from "./sections/APOD/constants";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="apod" element={<APOD />}>
        <Route
          path=""
          element={
            <Navigate to={`/apod/${dayjs().format(DATE_FORMAT)}`} replace />
          }
        />
        <Route path="archive" element={<APODArchive />} />
        <Route path=":date" element={<APODPhotoOfTheDay />} />
      </Route>
    </Routes>
  );
}

export default App;
