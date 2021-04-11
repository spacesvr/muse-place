import styled from "@emotion/styled";
import { useState } from "react";
import Terms from "./Terms";

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 0.6rem;

  & > a {
    color: #666;
  }
`;

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <Container>
        VR REALITY BY{" "}
        <a href="https://muse.place/muse" target="_blank" rel="noreferrer">
          MUSE.
        </a>
        <br />
        © 2021 Terra Labs, Inc. All Rights Reserved.
        <br />
        <a href="#" onClick={() => setShowTerms(!showTerms)}>
          Privacy Policy
        </a>{" "}
        •{" "}
        <a href="#" onClick={() => setShowTerms(!showTerms)}>
          Terms and Conditions
        </a>
        <br />
      </Container>
      {showTerms && <Terms onClick={() => setShowTerms(!showTerms)} />}
    </>
  );
};

export default Footer;
