import React, { useState, useEffect } from "react";
import "./styles.css";
import Item from "./Item";

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => { // 1
    const handleScroll = () => { // 2
      const { scrollY } = window;
      const topSection = document.querySelector<HTMLDivElement>(".top-section"); // 3

      if (scrollY > 100 && topSection) { // 4
        topSection.style.position = "absolute";
        topSection.style.top = scrollY + "px";
      } else {
        topSection.style.position = "static";
      }
    };
    const handleRemoveScroll = () => window.removeEventListener("scroll", handleScroll);

    window.addEventListener("scroll", handleScroll);
    return handleRemoveScroll; // 5
  });

  const handleShowCount = () => {
    alert(count);
  } // 5
  const handleResetCount = () => {
    setCount(0);
  } // 6
  const handleIncrementCount = () => {
    setCount(count + 1);
  } // 7

  return (
    <main className="App"> // 8
      <header className="top-section"> // 8
        <button
          type="button" // 9
          onClick={handleShowCount} // 5
        >
          Show count
        </button>
        <button
          type="button" // 9
          onClick={handleResetCount} // 6
        >
          Reset count
        </button>
      </header>
      <section className="block-wrapper"> // 8
        {Array.from({length: 6}, (_, i) => ( // 10
          <Item
            key={i} // 10
            onAdd={handleIncrementCount} // 7
          />
        ))}
      </section>
    </main>
  );
}