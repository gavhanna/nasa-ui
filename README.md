# NASAui

## Description

Open source frontend to publically available NASA data via NASA APIs. The goal of this project is to create an interesting open source frontend project where we have some craic with latest React, JS, CSS etc while still implementing a well structured and production ready web app.

## Installation

1. Get an API key from NASA APIs [here](https://api.nasa.gov/).
1. Clone this repo.
1. Cd into folder & run `npm install`.
1. Cope the `.env.example` and change it's name to `.env.local`.
1. Add your API key to the .env file on line 1.
1. Run `npm run dev` to run the local dev server.

## Project Structure

The `/app` folder contents:

### `/components`

Relatively self-explanatory, global re-usable components will go here and will follow the pattern laid out in the `Card` component whereby we have a folder for the component which houses the component `.js` file, a CSS module file and a test `spec.js` file. A line is then added to the `/components/index.js` file to easily import the component elsewhere: `export { default as Card } from "./Card/Card";`

### `/sections`

_This part is in a bit of flux and will no doubt change over time_

The main sections of the app, for example `APOD` which houses the [Astornomy Photo of the Day](https://open-nasa-ui.netlify.app/apod) section.

New sections will be added here and follow the pattern laid out in `/APOD`.

### `/features`

Redux related folder that contains "Services" and "Slices" related to applications state. The goal here being that each `section` will have it's own slice and service.

### `/layouts`

_This part is in a bit of flux and will no doubt change over time_

Page container components that dictate the layout of a page or section.

### `/styles`

Global styles and styling utilities. Component level styles exist at the component level.

### `/utils`

JS utility functions to be available globally. This will likely contain date related functions, some validation helpers or any other function that would be useful in several different sections or components.

## Style

This project uses [Open Props](https://open-props.style/) as a replacement for a regular CSS framework. Open Props is self-described as "supercharged CSS variables".

## Design

[Link to Figma mocks](https://www.figma.com/file/G4d2I7mL1HfzLR7ODEHzL7/NASAde?node-id=216%3A2).

## Deployment, CI/CD

The site is deployed to netlify (starter plan) on merge to master branch. Each PR triggers a build which checks prettier formatting and (soon will also check) unit tests.

When you create a PR you'll be greeted with a nice UI that will display the results of these checks.

## Contributing

### Branching Strategy

Please create your branch under the naming convention `user/{username}/{issueNumber}-{brief-description}`
