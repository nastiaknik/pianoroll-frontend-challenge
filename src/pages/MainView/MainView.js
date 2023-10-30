import { MdOutlineArrowBackIos } from "react-icons/md";
import MainViewCard from "../../components/MainViewCard/MainViewCard";
import PianoRollContainer from "../../components/PianoRollContainer/PianoRollContainer";
import { Wrapper, BackBtn, CardContainer } from "./MainView.styled";

const MainView = ({
  selectedRollData,
  onBackButtonClick,
  onCardClick,
  data,
}) => {
  const { rollData, id } = selectedRollData;

  return (
    <>
      <BackBtn onClick={onBackButtonClick}>
        <MdOutlineArrowBackIos size={16} color="#ffffff" />
      </BackBtn>

      <Wrapper>
        <MainViewCard id={id} rollData={rollData} />

        <CardContainer>
          <PianoRollContainer
            data={data}
            onCardClick={onCardClick}
            selectedRollId={id}
            page="view"
          />
        </CardContainer>
      </Wrapper>
    </>
  );
};

export default MainView;
