import { useEffect, useState } from "react";
import PianoRollCard from "../PianoRollCard/PianoRollCard";
import PianoRoll from "../PianoRoll/PianoRoll";
import { CardGrid, CardList } from "./PianoRollContainer.styled";

const PianoRollContainer = ({
  data,
  onCardClick,
  selectedRollId,
  page = "home",
}) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const generateCards = () => {
      if (!data || data.length === 0) {
        return null;
      }

      const cardArray = [];
      for (let it = 0; it < 20; it += 1) {
        if (selectedRollId !== null && it === selectedRollId) {
          continue;
        }

        const start = it * 60;
        const end = start + 60;
        const partData = data.slice(start, end);

        if (!partData || partData.length === 0) {
          return null;
        }

        const card = (
          <PianoRollCard
            key={it + 1}
            rollId={it}
            rollData={partData}
            onCardClick={onCardClick}
          >
            <PianoRoll sequence={partData} />
          </PianoRollCard>
        );
        cardArray.push(card);
      }
      setCards(cardArray);
    };

    generateCards();
  }, [data, onCardClick, selectedRollId]);

  return (
    <>
      {page === "home" ? (
        <CardGrid>{cards}</CardGrid>
      ) : (
        <CardList>{cards}</CardList>
      )}
    </>
  );
};

export default PianoRollContainer;
