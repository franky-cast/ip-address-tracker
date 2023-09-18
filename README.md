# IP address tracker

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./images/project-sc.png)

### Links

- Live Site URL: https://ip-address-tracer.netlify.app/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Javascript

### What I learned

This challenge helped me gain familiarity with API's and handling promises with the fetch() function. Excellent opportunity to use both the .them() method and asnyc/await syntax.

De-constructing the object that is returned after submitting an HTTP request to an API makes things a lot simpler.

```js

const {ip, location:{city}, location:{region}, location:{postalCode}, location:{country}, location:{timezone}, isp, location:{lat}, location:{lng}} = responseObj

```
