# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Reflection](#Reflection)


## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot
![](./screenshot/desktop-detail-page.png)
![](./screenshot/desktop-dark-mode.png)
![](./screenshot/desktop-light-mode.png)

### Links

- Live Site URL: [Add live site URL here](https://countries-2026.netlify.app/)\

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [Styled Components](https://cdnjs.com/libraries/font-awesome) - For fonts

### Initial typescript Project setup

    - Initialize the project with npm
        npm init -y
    - Install TypeScript and other necessary dependencies 
        npm install typescript @types/node --save-dev
    - Create a tsconfig.json file by running
        npx tsc --init
    - In package.json ensure you have "type": "module" to import & export the module
    - In tsconfig.json, make sure to have "module": "es6", for the project runs in the browser

### Run and Test Your Code:
    - Compile your TypeScript code
        npx tsc
    - Runs the typescript compiler in watch mode, meaning that every time you save a .ts file it automatically recompiles
        npx tsc --watch

### What I learned
- HTML/Javascript
    - I learned to apply theme for a website using the Css variables and toggle with two different classes.
    - how to navigate from main page to another page.
        Load index.html
        created countrydetails.html , which contains only the content not the full page.
        uses  JavaScript to fetch and inject content dynamically
- CSS - I learned the difference between the two main box-sizing values -  border-box, content-box
    - content-box (default value)
        - The width/height you set applies only to the content area.
        - Padding and border are added on top, making the final element bigger
    - border-box
        - The widht/height includes content + padding + border
        - The final size stays exactl what you set
        - Prevents the layout breakage when adding padding or border.
- Typescript 
  I learned more about
    - how to process the response data from the API response. Country Object has many attributes with complex objects in it, learnt how to structure the model object based on the response data
    - custom types, union types   
    - tsconfig.json and compilation
    - Typescript types DOM elements like HTMLElement, HTMLButtonElement, HTMLInputElement

### Continued development


### Useful resources

[HTML, JS resource](https://developer.mozilla.org/en-US/docs/Web) - Used this website to refer the HTML DOM manipulation and Jaavscript functionalities.
[HTML resource](https://www.w3schools.com/html//html_css.asp) - Used this for basic HTML and CSS 
[CSS flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Refered this document for CSS flex


## Reflection

### Challenge
- Faced a challenge in retrieving the country details from the API response as it certain attributes has complex objects
### Solution
- Created a new type for each object.
    Ex: For name attribute created following types in model class
           
           ```
            type Name = {
                common: string;
                nativeName:{[key:string]:nativeNameObj};
            }

            type currency={
                name:string;
                symbol:string;
            }

            type nativeNameObj={
                official:string;
                common:string;
            }
            ```