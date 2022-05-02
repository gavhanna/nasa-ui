import dayjs from "dayjs";
import { DATE_FORMAT } from "./APOD.constants";

const routes = [
  {
    path: `/apod/${dayjs().format(DATE_FORMAT)}`,
    name: "Photo of the Day",
    icon: <i className="fa-solid fa-camera"></i>,
  },
  {
    path: "/apod/archive",
    name: "Archive",
    icon: <i className="fa-solid fa-list"></i>,
  },
];

export default routes;
