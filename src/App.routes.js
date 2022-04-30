import dayjs from "dayjs";
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { APOD, Home } from "./sections";
import { APODArchive, APODPhotoOfTheDay } from "./sections/APOD";
import { DATE_FORMAT } from "./sections/APOD/constants";

export const appRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/apod",
    component: APOD,
    routes: [
      {
        path: "/apod",
        component: () => (
          <Navigate to={`/apod/${dayjs().format(DATE_FORMAT)}`} replace />
        ),
      },
      {
        path: "/apod/archive",
        component: APODArchive,
      },
      {
        path: "/apod/:date",
        component: APODPhotoOfTheDay,
      },
    ],
  },
];

export function renderRoutes(routes) {
  return routes.map((route, index) => {
    return (
      <Route key={index} path={route.path} element={<route.component />}>
        {route.routes && renderRoutes(route.routes)}
      </Route>
    );
  });
}
