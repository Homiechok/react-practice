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