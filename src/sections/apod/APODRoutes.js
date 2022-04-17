import dayjs from "dayjs";

export default [
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
