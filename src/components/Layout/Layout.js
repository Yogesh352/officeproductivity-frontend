import Sidebar from "../Sidebar/Sidebar";
import { Box, Container } from "@mantine/core";
import { useStateContext } from "../../context/ContextProvider";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { activeMenu } = useStateContext();
  const location = useLocation();
  if (location.pathname.includes("auth")) {
    return (
      <Box className="bg-gray-50 min-h-screen px-10 py-4 flex-1 overflow-y-auto p-5 relative">
        {children}
      </Box>
    );
  } else {
    return (
      <>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg z-100 bg-white">
              <Sidebar />
            </div>
          ) : null}
          <Container
            className={
              activeMenu
                ? "dark:bg-main-dark-bg min-h-screen bg-main-bg  md:ml-72 w-full flex flex-col relative h-screen p-0 max-w-full ml-0 "
                : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2  h-screen p-0 max-w-full ml-0"
            }
          >
            <Box className="fixed bg-white top-0 z-[150]  bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </Box>

            <Box className="bg-gray-50 min-h-screen px-10 py-4 flex-1 pt-20 p-5 relative">
              {children}
            </Box>
          </Container>
        </div>
      </>
    );
  }
}
