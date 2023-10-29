import React from "react";

const PianoRollCard = ({ rollId, children }) => {
  return (
    <div className="piano-roll-card">
      <div className="description">This is a piano roll number {rollId}</div>
      {children}
    </div>
  );
};

export default PianoRollCard;
