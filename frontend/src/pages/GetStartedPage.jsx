import { Button } from "@chakra-ui/react";
import Navbar from "../components/Navbar"; 

function GetStartedPage() {
    return (
      <>
      <Navbar />

        <Button
        borderWidth="1px"
        bg="#FD660B"
        textColor="white"
        position="absolute"
        top="50%" // Move it 50% from the top
        left="50%" // Move it 50% from the left
        transform="translate(-50%, -50%)" // Center it exactly in the middle
        >
        yey
        </Button>

      </>
    )
  }

export default GetStartedPage;
