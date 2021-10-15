## Steps: ##

1. added app.js and added accordion component as it's child. App is passing Items array as props to accordion.
2. Mapped items on <div> using items.map() .
3. add semantic UI css to the index.html link tag.
4. add helper function for click in accordian component. If we write the handler like this:

```javaScript
onClick={onTitleClick(index)}
```

It will be immediately executed on the page load, not on button click. To make it work on btn clk, we write it in arrow function:

```javaScript
onclick={() => onTitleClick(index)}
```

5. Whenever the setter function in the useState is called, the component reload takes place.
6. Added dynamic class for active accordion.
7. 

# The "useEffect" Hook #

1. Allows function components to use something like lifecycle methods

2. We configure the hook to run some code automatically in one of three: 

- When the component is rendered for the first time and whenever it renders.

- When the component is rendered for the first time and whenever it re-renders.

- When the component is rendered for the first time and whenever it renders and some piece of data has changed.

















