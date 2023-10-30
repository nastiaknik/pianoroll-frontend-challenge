import PianoRoll from "../../components/PianoRoll/PianoRoll";
import { MainCard } from "./MainViewCard.styled";

const MainViewCard = ({ id, rollData }) => {
  return (
    <MainCard>
      <p>This is a piano roll number {id}</p>
      <PianoRoll sequence={rollData} page="view" />
    </MainCard>
  );
};

export default MainViewCard;
