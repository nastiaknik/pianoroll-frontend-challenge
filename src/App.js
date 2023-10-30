import { useState } from "react";
import MainView from "./pages/MainView/MainView";
import MainPage from "./pages/MainPage/MainPage";
import logo from "./asserts/white.svg";
import { Main, NavBar, Logo, Header } from "./App.styled";

const App = () => {
  const [data, setData] = useState(null);
  const [selectedRollData, setSelectedRollData] = useState(null);

  const handleCardClick = (rollData) => {
    setSelectedRollData(rollData);
  };

  const handleBackButtonClick = () => {
    setSelectedRollData(null);
  };

  async function loadPianoRollData() {
    try {
      const response = await fetch("https://pianoroll.ai/random_notes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  return (
    <Main>
      <Header>
        <NavBar>
          <Logo src={logo} alt="PianoRoll logo" />
        </NavBar>
      </Header>

      {selectedRollData ? (
        <MainView
          data={data}
          selectedRollData={selectedRollData}
          onCardClick={handleCardClick}
          onBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <MainPage
          data={data}
          onCardClick={handleCardClick}
          loadPianoRollData={loadPianoRollData}
        />
      )}
    </Main>
  );
};

export default App;
