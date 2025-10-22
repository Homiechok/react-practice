# Рефакторинг 3

1. Добавил useEffect для оптимизации
2. Вынес логику скролла в переменную
3. Вынес переменную topSection на верхний слой, чтобы убрать дублирование
4. Подправил условия для простоты и убрал бесполезный return
5. Вынес логику в переменную handleShowCount
6. Вынес логику в переменную handleResetCount
7. Вынес логику в переменную handleIncrementCount
8. Исправил теги в соответствии со семантикой (main, section, header)
9. Добавил атрибут type для кнопок
10. Оптимизировал рендер элементов через массив 

Было:
```js
import React, { useState } from "react";
import "./styles.css";
import Item from "./Item";

export default function App() {
  const [count, setCount] = useState(0);
  window.addEventListener("scroll", () => {
    const { scrollY } = window;
    if (scrollY > 100) {
      const topSection = document.querySelector<HTMLDivElement>(".top-section");
      if (topSection) {
        topSection.style.position = "absolute";
        topSection.style.top = scrollY + "px";
      } else {
        return;
      }
    } else {
      const topSection = document.querySelector<HTMLDivElement>(".top-section");
      if (topSection) {
        topSection.style.position = "static";
      } else {
        return;
      }
    }
  });

  return (
    <div className="App">
      <div className="block-wrapper">
        <div className="top-section">
          <button
            onClick={() => {
              alert(count);
            }}
          >
            Show count
          </button>
          <button
            onClick={() => {
              setCount(0);
            }}
          >
            Reset count
          </button>
        </div>
        <Item
          onAdd={() => {
            setCount(count + 1);
          }}
        />
        <Item
          onAdd={() => {
            setCount(count + 1);
          }}
        />
        <Item
          onAdd={() => {
            setCount(count + 1);
          }}
        />
        <Item
          onAdd={() => {
            setCount(count + 1);
          }}
        />
        <Item
          onAdd={() => {
            setCount(count + 1);
          }}
        />
        <Item
          onAdd={() => {
            setCount(count + 1);
          }}
        />
      </div>
    </div>
  );
}
```

Стало:
```js
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
```
