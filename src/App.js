import React, {useState} from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/dropdown";
import Translate from "./components/Translate";
import Route from "./components/route";
import Header from "./components/Header";

const items = [
  {
    title: "What is React?",
    content: "React is a front end javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components",
  },
];


const options = [
  {
      label: 'the color red',
      value:'red'
  },
  {
      label: 'the color green',
      value: 'green'
  },
  {
    label: 'the color pink',
    value: 'pink'
  }
]

// const showAccordion = () => {
//   if(window.location.pathname === '/'){
//     return <Accordion items={items} />
//   }
// };

// const showList = () => {
//   if(window.location.pathname === '/list'){
//     return <Search />
//   }
// };

// const showDropdownn = () => {
//   if(window.location.pathname === '/dropdown'){
//     return <Dropdown 
//     label="select a color"/>
//   }
// };

// const showTranslate = () => {
//   if(window.location.pathname === '/translate'){
//     return <Translate />
//   }
// };

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true)

  return (
    <div>
      <Header />
      {/* <Accordion items={items} /> */}
      {/* {showAccordion()}
      {showList()}
      {showTranslate()}
      {showDropdownn()} */}
      {/* <Translate/> */}
      {/* <Search />  */}
      <Route path="/">
        <Accordion items={items} />
      </Route>

      <Route path="/translate">
        <Translate />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown 
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
          label="select a color"/>
      </Route>
      {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
      { showDropdown ? 
        <Dropdown  
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
          label="select a color"
          /> : "" 
      } */}
    </div>
  );
};
export default App;
