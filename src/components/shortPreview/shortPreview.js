import React from "react";

const ShortPreview = props => {
  const { category, workshop } = props;
  return (
    <div>
      <h3>
        <strong>Category {category}:</strong>
      </h3>
      {workshop.map(workshop => (
        <div key={workshop.id}>
          <img src="https://via.placeholder.com/30" alt="course" />
          <p>{workshop.description}</p>
          <button>Learn more</button>
        </div>
      ))}
    </div>
  );
};
export default ShortPreview;
