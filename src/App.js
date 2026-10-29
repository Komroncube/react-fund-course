import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {
    return (
        <div className="App">
            <Counter />
            <ClassCounter />
        </div>
    );
}

export default App;
