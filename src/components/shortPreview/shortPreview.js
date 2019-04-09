import React from "react";

const ShortPreview = props => {
  const { category, workshop } = props;
  return (
    <div>
      <h3>
        <strong>Category {category}:</strong>
      </h3>
      {workshop.map(workshop => (
        <div
          className="grid-x grid-padding-x small-up-2 medium-up-3 card"
          key={workshop.id}
        >
          <img
            className="cell medium-4 large-4"
            src="https://via.placeholder.com/20"
            alt="course"
          />
          <div className="cell medium-6 large-8">
            <p>{workshop.description}</p>
            <button className="button">Learn more</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ShortPreview;
