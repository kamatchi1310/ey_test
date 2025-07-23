import React from "react";
import { CircularProgress, Box, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container className="center">
      <CircularProgress />
    </Container>
  );
};

export default Loader;
