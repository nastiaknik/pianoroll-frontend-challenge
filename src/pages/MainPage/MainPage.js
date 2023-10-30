import PianoRollContainer from "../../components/PianoRollContainer/PianoRollContainer";
import { Title, Button } from "./MainPage.styled";

const MainPage = ({ data, onCardClick, loadPianoRollData }) => {
  return (
    <>
      <Title>Welcome to PianoRoll frontend coding challenge!</Title>
      <Button onClick={loadPianoRollData}>Load Piano Rolls!</Button>
      <PianoRollContainer data={data} onCardClick={onCardClick} />
    </>
  );
};

export default MainPage;
