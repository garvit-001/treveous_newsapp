import React, { useState } from "react";

const Welcome = (props) => {
  // const name = this.props;
  return (
    <div>
      Hello, {name}
    </div>
  );
};

// function ChildComponent({ name }) {
//   const [currentName, setCurrentName] = useState(name);

//   function handleClick() {
//     setCurrentName("New Name"); // This will update state
//   }

//   return <button onClick={() => handleClick()}>Change Name</button>;
// }

export default Welcome;
