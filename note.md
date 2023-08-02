# Things I learned along the way

## 07/29/23
1. In React, it is generally not a good idea to manipulate DOM using document.querySelector. Instead, using useRef() is recommended. 
  - React's workflow is as below: 
    - React works with a virtual DOM, which is a lightweight copy of the actual DOM. 
    - When there are changes to virtual DOM (state, prop, etc), React compares the new virtual DOM against the previous virtual DOM. This process is called reconciliation. 
    - Then, React calculates the difference between the two virtual DOMs. This process is called diffing. 
    - Once React is done with diffing, it calculates the minimum changes required to update the actual DOM rather than re-rendering the entire DOM. 

If we use document.querySelector() and such, we change the actual DOM and mess up React's reconciliation process. It is best to use useRef, useState, and props unless absolutely necessary(?)

2. When adding className via DOM manipulation (i.e. classList.add/toggle) and the stylesheet is imported as a module, you still have to specify 'styles'. 

```js
const chosenElement = useRef(null);
chosenElement.current?.classList.add(styles["newStyleName"]);
```