import dayjs from "dayjs";
import { DATE_FORMAT } from "./constants";

const routes = [
  {
    path: `/apod/${dayjs().format(DATE_FORMAT)}`,
    name: "Photo of the Day",
    icon: <i class="fa-solid fa-camera"></i>,
  },
  {
    path: "/apod/archive",
    name: "Archive",
    icon: <i class="fa-solid fa-list"></i>,
  },
];

export default routes;
