import dayjs from "dayjs";

const routes = [
  {
    path: "/apod/archive",
    name: "Archive",
    icon: <i class="fa-solid fa-list"></i>,
  },
  {
    path: `/apod/${dayjs().format("YYYY-MM-DD")}`,
    name: "Photo of the Day",
    icon: <i class="fa-solid fa-camera"></i>,
  },
];

export default routes;
