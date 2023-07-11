import styled from 'styled-components';

const About = () => {
    return (
      <Container>
        <p>
          With Eorzean Armory, you can manage your Final Fantasy XIV (FFXIV) gear. Simply claim your FFXIV character and set the gear you want to obtain in your user profile. As you acquire the gear, you can easily check it off from your list, keeping track of your progress.
        </p>
        <p>
        Below, you can search for your FFXIV characters and see whether they have been claimed in your account. To register a character, copy the character's ID and proceed to the registration page.
      </p>
      </Container>
    );
  }

const Container = styled.div`
    background-color: #1d2324;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    border: black solid 1px;
    margin: 1em;
    line-height: 1.8;
`;

export default About;