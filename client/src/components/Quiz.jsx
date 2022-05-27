import React from "react";

const Quiz = ({ data }) => {
  return (
    <div>
      {data.map((q) => (
        <>
          <h1>{q.description}</h1>
          {q.options.map((op) => (
            <button>{op}</button>
          ))}
          <h3>Voting</h3>
        </>
      ))}
    </div>
  );
};

export default Quiz;
