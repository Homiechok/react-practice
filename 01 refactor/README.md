# Рефакторинг 1

1. pleaseRevienMe -> pleaseReviewMe
2. data не меняется, можно просто вычислить переменную
3. Аналогично, нет смысла от useState
4. Добавил зависимости
5. Поменял тэг на семантически верный + аттрибуты
6. Исправил экспорт + наименование

Было:
```js
import React from "react";
import sendMetric from "metrics";
import sendData from "data";
import bigComputations from "bigComputations";

const pleaseRevienMe = (props) => {
  const [data, setDate] = React.useState(bigComputations(props.argument));

  const [items] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  React.useLayoutEffect(() => {
    document.addEventListener("click", () => {
      sendMetric("click");
    });
  });

  const click = React.useCallback((id) => {
    sendData(data, id);
  });

  return (
    <React.Fragment>
      {items.map((item) => (
        <div onClick={() => click(item.id)}>{item.id}</div>
      ))}
    </React.Fragment>
  );
};

export pleaseRevienMe;
```

Стало:
```js
import React from "react";
import sendMetric from "metrics";
import sendData from "data";
import bigComputations from "bigComputations";

const pleaseReviewMe = (props) => { // 1
  const data = bigComputations(props.argument); // 2

  const items = [{ id: 1 }, { id: 2 }, { id: 3 }]; // 3

  React.useLayoutEffect(() => {
    document.addEventListener("click", () => {
      sendMetric("click");
    });
  });

  const click = React.useCallback((id) => {
    sendData(data, id);
  },[data]); // 4

  return (
    <React.Fragment>
      {items.map((item) => (
        <button type="button" key={item.id} onClick={() => click(item.id)}>{item.id}</button> // 5
      ))}
    </React.Fragment>
  );
};

export default pleaseReviewMe;
```
