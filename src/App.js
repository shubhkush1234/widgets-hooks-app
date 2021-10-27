import React, {useState} from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/dropdown";
import Translate from "./components/Translate";

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

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true)

  return (
    <div>
      {/* <Accordion items={items} /> */}
      <Translate/>
      {/* <Search />  */}
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
