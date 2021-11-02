Stephen grider, 52.5 hrs long course, Udemy

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
15. Now, to implement the delayed request we'll make use of useEffect cleanup function to clear the timer:

```javaScript

    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',
                {params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format:'json',
                        srsearch: term
                }});
            setResults(data.query.search);
        }
        const timeoutId = setTimeout(() => {
            if(term){ // to avoid empty term search request
                search(); 
            }}, 5000)
        return () => { // this is called cleanup function
            clearTimeout(timeoutId);
        }
    }, [term]);

```

It delays/throttles the number of requests. This is called as "debouncing" in javaScript.

Read more in the useEffect cleanup function in my useEfect docs.

16. 1 problem arises here. When we are making the initial request on initial render, the request is delayed by 5000ms due to timer.
We can add a check to detect when our component is first rendered and make API request immediately:

```javaScript

if(term && !results.length){
    search();
} else {
    const timeoutId = setTimeout(() => {
        if(term){
            search();
        }
    }, 5000)
    return () => clearTimeout(timeoutId);
}

```

17. Implementation for Dropdown:

- Create the options array of objects in app.js :

```javaScript

const options = [
    {
        label: 'the color red',
        value:'red'
    },
    {
        label: 'the color green',
        value: 'green'
    }
]

```

18. pass it to Dropdown component as prop and Map the array there:

```javaScript

    // in app.js
      <Dropdown  options={options}/>

      // in dropdown component
      const renderedOptions = props.options.map((option, index) => {
        return(
            <div key={option.value} className="item">
                {option.label}
            </div>
        );
    });

```

Add some jsx to render it in form of a dropdown. This completes basic dropdown.

19. We want to make the dropdown re-usable. So, the options, selected value and onchange handlers should come as a prop. Those prop we'll pass from app comp. to dropdown component:

```javaScript

// using the state in app (parent) component
  const [selected, setSelected] = useState(options[0]);

// passing as prop to dropdown (child) component
<Dropdown  
        options={options}
        selected={selected}
        onSelectedChange={setSelected}
        />

```
20. As we have set the initial value to the "selected" state as options[0], means {label: 'the color red',value:'red'} , we can easily set the default value to dropdown selected text like this:

```javaScript

    <div className="text"> {selected.label}</div>

```

21. Now, we want to (select the dropdown option) or (set the state) of dropdown on user click. So, we need to write eventHandler in Dropdown component like this:

```javaScript

    const renderedOptions = options.map((option) => {
        return(
            <div key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
                >
                    {option.label}
            </div>
        );
    });

```
The on Click, the "onSelectedChange" will pass the current "clicked" value to the parent "app comp." and since it's "selected" state is changed, it will cause re-rendering and the dropdown selected-option will be changed.

This is a classic example of child to parent communication using callback function.

22. We also need to remove the current "selected option" from the deopdown and show it in the "selected" option. To do so, we need to add a condition in the list renderer:

```javaScript


    const renderedOptions = options.map((option) => {
        //newly added condition for removing "selected" option from list
        if(option.value === selected.value){
            return null;
        }

        return(
            <div key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
                >
                    {option.label}
            </div>
        );
    });

```

23. We need to close/toggle the dropdown as well, once user selects any option from dropdown. One way is to delete the options from list once an option is selected, second is to hide it with css clsses. Using css is preferable:

```javaScript

// write state for open/close
    const [open, setOpen] = useState(true);

// write dynamic css classes using template strings
    <div className="ui form">
        <div className="field">
            <label className="label"> Select a color</label>
            <div 
                onClick={() => setOpen(!open)}
                className={`ui selection dropdown ${ open ? 'visible active' : ''} `}>
                <i className="dropdown icon"></i>
                <div className="text"> {selected.label}</div>
                <div className={`menu ${open ? 'visible transition' : ''}`}>
                    {renderedOptions}
                </div>
            </div>
        </div>
    </div>

```

24. The dropdown is perfect now, but on clicking outside the dropdown, it's not closing. We'll add differentevent listeners for that. 

What we've got so far:

- The dropdown needs to detect a click event on any element besides one it created.

- The dropdown has hard time setting up event handlers on elements that it does not create.

- Event bubbling is a thing.


The event listeners which are manually added i.e "document.body.addEventListener" will be called first, and then the React event listeners will be called.

```javaScript

useEffect( () => {
    document.body.addEventListener("click", () => {
        setOpen(false);
    });
}, []);

```

TIP: To add and check event listener:

- To check the behavious of manually added event listeners, run it in console directly:

```javaScript

document.body.addEventListener("click", () => {
    console.log("Click Event happened");
})

//Whenever click event happens, it will be triggered.
// The event bubbling takes place.

```

25. Till now, the "outside-click" is making the dropdown close, due to body-event-listener. But the dropdown is not closing on selecting any value.

This is because when we clicking the dropdown option, first the body-event-listener is called, which set the open:false, second option-setter event listener is called, third the "setOpen(!open)" written on the dropdown is called, which sets "open: (!false)" i.e true. So, the dropdown doesn't close. 

26. This can be fixed by using useRef() hook. ref.current contains many helper functions to give us control on the particular element where it's placed.

```javaScript

useEffect(() => {
        document.body.addEventListener("click", (event) => {
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false);
        },
        { capture: true }
        ) 
    })

    // in the JSX
    <div ref={ref} className="ui form">

```

This fixes all the dropdown issues.

27. Now, we want to create a toggle dropdown button which will show/hide the dropdown. So, we'll add it there in App.js component:

```javaScript

const [showDropdown, setshowDropdown] = useState(true); 

// jsx

<button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
      { showDropdown ? 
        <Dropdown  
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
          /> : "" 
      }

```

But now, clicking outside the dropdown after toggle-off gives us the error msg : "TypeError: cannot read properties of null( reading contains)" .

This means, when the reference to useRef is removed, the "ref.current" becomes null, i.e "null.contains".

28. It can be fixed by clearing the event-listener after the component is unmounted. Since the useEffect() hook's cleanup function runs during unmounting, we can write code there:

```javaScript

    useEffect(() => {
        const onBodyClick = (event) => {
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false);
        }
        
        document.body.addEventListener("click", onBodyClick, { capture: true });

        return  () =>{
            document.body.removeEventListener("click", onBodyClick, { capture: true });
        } 
    }, []);

```

Hence, all our dropdown issues are fixed now.

29. Translate Component:

Now we want to create a "translate-component" which will send options, language n setLanguage props to the dropdown and the "convert-component" will show language-translation.

```javaScript

const options= [
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Hindi',
        value: 'hi'
    }
]

```

30. The convert-component will receive the "language" and "text" prop and:

- A new value for 'language' or 'text' has appeared, convert it and show the output.

- Make request to google translate API.

- update state with data from response

- Show data from response to screen.

```javaScript
const Convert = ({language, text}) => {

    useEffect( () => {
        console.log("New language or text")
    }, [language, text]);

    return (
        <div>            
        </div>
    )
}
export default Convert; 

// Import the convert component in Translate component
<Convert text={text} language={language} />
```

31. Set the language and text state in the "translate-component" and pass it to "dropdown-component" and "convert-component" as prop.  


32. In the "convert-component", make the API call in the useEffect as:

```javaScript


const Convert = ({language, text}) => {

    const [translated, setTranslated]= useState("");

    useEffect( () => {

        const doTranslation = async () => {
            const { data } = await axios.post(
                'https://translation.googleapis.com/language/translate/v2',
                {},
                {
                    params: {
                        q: text,
                        target: language.value,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                    }
                });

                setTranslated(data.data.translations[0].translatedText);
            
        };

        doTranslation(); // always make sure to call
    }, [language, text]);

    return (
        <div>
            <h1 className="ui header">
                {translated}
            </h1>
            
        </div>
    )
}
export default Convert; 

```

33. We are getting the response but API call is made on every language/Input change. So, we need to debounce the request. For that, we need to write 2nd useEffect() hook:

```javaScript

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 5000);

        return () => {
            clearTimeout(timerId);
        }
    }, [text])

```

Also, pass the "q" parameter as "debouncedText" instead of "text" done before. Also, update dependency as "debounceedText" instead of "text".
This completes our translate. Now we'll move to routing. 















# Routing: (without React Router) #

1. Route Mapping

- localhost:3000/ accordion
- localhost:3000/search search
- localhost:3000/dropdown dropdown
- localhost:3000/translate translate

2. We can write functions for navigation:

```javaScript

const showAccordion = () => {
  if(window.location.pathname === '/'){
    return <Accordion items={items} />
  }
};

const showList = () => {
  if(window.location.pathname === '/list'){
    return <Search />
  }
};

const showDropdownn = () => {
  if(window.location.pathname === '/dropdown'){
    return <Dropdown 
    label="select a color"/>
  }
};

const showTranslate = () => {
  if(window.location.pathname === '/translate'){
    return <Translate />
  }
};

///calling it inside render:
  return (
    <div>
      {showAccordion()}
      {showList()}
      {showTranslate()}
      {showDropdownn()}
      
```

3. Instead of writing 4 different functions, we can write 1 function for this:

```javaScript

const showComponent = (route, component) => {
    return window.location.pathname === route
        ? component 
        : null
};

```

But this is not the react way of doing things.

4. Rather than making some standalone function, We can create a component which will decide which component to show based on current pathName:

```javaScript

// create a Route.js component
const Route = ({path, children}) => {
    window.location.pathname === path ? 
        children : null
}
export default Route;

// In the App.js component
<Route path="/">
    <Accordion items={items}>
<Route/>

<Route path="/translate">
    <Translate />
<Route/>

<Route path="/dropdown">
    <Dropdown 
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
          label="select a color"/>
</Route>
<Route path="list">
    <Search />
<Route/>

```

5. Implementing header for Navigation:

```javaScript

import React from 'react';

const Header = () => {
    return(
        <div className="ui secondary pointing menu">
            <a href="/" className="item">
                Accordion
            </a>
            <a href="/list" className="item">
                Search
            </a>
            <a href="/dropdown" className="item">
                Dropdown
            </a>
            <a href="/translate" className="item">
                Translate
            </a>
        </div>
    );
}
export default Header;

// Show <Header /> compoent in App.js
<Header />

```

6. This routing is working perfectly fine. It is not a recommended way as it does the full page reload when link is clicked. We should do it like this:

- User clicks on "List"
- Change the URL, but you don't do a full page refresh.
- Each Route could detect the URL has changed.
- Route could update piece of state tracking the current pathname.
- Each Route renders, showing/hiding components appropriately.

7. In the "Header" component, we'll write a "Link" component which will execute a "special logic" when user clicks on the link, and prevent the full page reload as well. When user clicks on each of the links, "Navigation Event" is fired and it will be listened all over the routes.

Refer Router and Link for it's implementation.











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

3. useEffect cleanup function:

- When we return some function (clean up function) from the useEffect hook, the returned function does not run on initial render. It runs when the state/dependency is changed. On change, it runs before the body of the useEffect runs.

```javaScript

useEffect(() => {
    console.log("Initial render or term was changed");

    return () => {
        console.log("CLEAN UP");
    };
}, [term]);

// Output on initial render: "Initial render or term was changed"
// Output on term change: CLEAN UP "Initial render or term was changed"

```

So, in short:

- when the component renders, it runs the body of useEffect, not cleanup.

- When the useEffect runs again, first clean up function runs, then the useEffect body.

- Also, the cleanup function runs when the component is unmounted.


# The "useRef" Hook #

- UseRef allows us to get a reference to a direct DOM element. 








