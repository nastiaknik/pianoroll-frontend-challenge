import { Card, Description } from "./PianoRollCard.styled";

const PianoRollCard = ({ rollId, rollData, onCardClick, children }) => {
  return (
    <Card onClick={() => onCardClick({ rollData, id: rollId })}>
      <Description>This is a piano roll number {rollId}</Description>
      {children}
    </Card>
  );
};

export default PianoRollCard;
