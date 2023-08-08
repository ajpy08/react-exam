import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#5141EA'
      }}
      component="footer"
    >
      <Container maxWidth="md">
        <br/>
        <Typography variant="body1" color="text.primary" align="justify">
          We are coding the world of tomorrow
        </Typography><br/>
        <Typography variant="body2" color="text.secondary" align="justify">
            DaCodes es una de las mejores empresas de desarrollo de software en México y LATAM. 
            Lo que nos separa de los demás es el nivel de involucramiento que tenemos en nuestros 
            proyectos y la pasión que tenemos por desarrollar productos digitales de calidad mundial.
            Somos un equipo de 220+ dacoders especializados en la planeación, diseño, desarrollo, 
            implementación e innovación continua de productos digitales disruptivos.
        </Typography><br/>
      </Container>
    </Box>
  );
};

export default Footer;
