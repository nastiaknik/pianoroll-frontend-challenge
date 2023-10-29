import { useEffect, useState } from "react";
import PianoRollCard from "./PianoRollCard";
import PianoRoll from "./PianoRoll";

const PianoRollContainer = ({ data }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const generateCards = async () => {
      if (!data || data.length === 0) {
        return null;
      }

      const cardArray = [];
      for (let it = 0; it < 20; it += 1) {
        const start = it * 60;
        const end = start + 60;
        const partData = data.slice(start, end);

        if (!partData || partData.length === 0) {
          return;
        }

        const card = (
          <PianoRollCard key={it} rollId={it} rollData={partData[it]}>
            <PianoRoll sequence={partData} />
          </PianoRollCard>
        );
        cardArray.push(card);
      }
      setCards(cardArray);
    };

    generateCards();
  }, [data]);

  return <div id="pianoRollContainer">{cards}</div>;
};

export default PianoRollContainer;
