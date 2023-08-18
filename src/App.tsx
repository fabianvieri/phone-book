import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BsFillPersonVcardFill } from "react-icons/bs";

import ContactList from "./components/ContactList";

const Header = styled.header`
  font-size: 1rem;
  border-radius: 4px;
  color: black;
  font-weight: bold;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
`;

const Heading = styled.h1`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <Header>
        <Heading>
          <IconContext.Provider
            value={{
              style: {
                marginRight: "5px",
                color: "darkgreen",
              },
            }}
          >
            <BsFillPersonVcardFill size={40} />
          </IconContext.Provider>
          Phone Book
        </Heading>
      </Header>
      <main>
        <ContactList />
      </main>
    </Container>
  );
}

export default App;
