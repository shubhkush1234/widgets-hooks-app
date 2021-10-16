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
7. Search comonent added with a input element and setting its value to state.
8. In the useEffect hook, making the api call using axios, 1st param it takes as the domain url, and second it takes the options object. In the second paramameter, we can pass the query params and axios will create a query string/url for us.
9. Since we are setting the state on onChange event, the API request will be made on every character we type on search btn.  
10. As we are giving term state an empty string initial value, on the page load it will make the 1st api call with empty string. To avoid it, on e way is to provide some initial search term, other was is that we can write a conditional in useEffect:

```javaScript

if (term){
    search();
}

```

11. We'll declare another state for storing the search result which we can later render on screen.

12. 








# The "useEffect" Hook #

1. Allows function components to use something like lifecycle methods

2. We configure the hook to run some code automatically in one of three: 

- When the component is rendered for the first time and whenever it renders.

- When the component is rendered for the first time and whenever it re-renders.

- When the component is rendered for the first time and "whenever it re-renders and some piece of data has changed".

Explaination:

3 cases for useEffect second argument:

1. [] 

- it will run at initial render

2. ..nothing..

- Run at initial render

- Run after every re-render

3. [data] 

- Run at initial render

- Run after every re-render if data has changed since last render.

## Import use cases with UseEffect ##

1. We can't use async directly inside useEffect:

```javaScript

useEffect(async () => {
    await axios.get('https://wiki.com');
}, [someState]);

```

There are 3 different work arounds for this:

- use helper function inside useEffect:

```javaScript

useEffect( () => {
    const search = async () => {
        await axios.get('https://wiki.com');
    };
     search();
}, [someState]);

```

- using iife :

It is more cleaner syntax than the above one.

```javaScript

useEffect( () => {
    (async () => {
        await axios.get('https://wiki.com');
    })();
}, [someState]);

```

- Using promises :


```javaScript

useEffect( () => {
    axios.get('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=programming')
        .then((response) => {
            console.log(response.data);
        });
}, [someState]);

```

The first approach is the most recommended one. Promises are least recommended.








