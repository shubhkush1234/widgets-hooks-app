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

12. For rendering the results, we use array.map method and render on screen. Since the "pageid" we're getting from the API result, we can take it as key in the map.

13. We need to show the query.search.snippet, but we are getting it in the form of html, not string. Sample response: 

```json

"query": {
        "searchinfo": {
            "totalhits": 562165
        },
        "search": [
            {
                "ns": 0,
                "title": "Computer programming",
                "pageid": 5311,
                "size": 30472,
                "wordcount": 3331,
                "snippet": "Computer <span class=\"searchmatch\">programming</span> <span class=\"searchmatch\">program</span> to accomplish a specific computing result or to perform a",
                "timestamp": "2021-10-09T21:56:02Z"
            },
            {
                "ns": 0,
                "title": "Program",
                "pageid": 23771,
                "size": 2805,
                "wordcount": 311,
                "snippet": "projects Time management <span class=\"searchmatch\">Program</span>, a part of planning <span class=\"searchmatch\">Programming</span> (music), generating music electronically Radio <span class=\"searchmatch\">programming</span>, act of scheduling content",
                "timestamp": "2021-09-29T06:57:25Z"
            }

```

There are 2 possible ways we can achieve this:

- By find and replace methods: We can find all the span, classes and other html elements and replace with empty string.

- By rendering snippet as HTML: 

```javaScript

    <span dangerouslySetInnerHTML={{__html: result.snippet }}></span>

```

14. Now, we want user to not only show the page title and description, but also to go to the corresponding wikipedia page. 

```javaScript

<a className="ui button" 
    href={`https://en.wikipedia.org?curid=${result.pageid}`}
    >Go
</a>

```




















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








