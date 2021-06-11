import styled, { keyframes } from "styled-components";

import AvatarOne from "../../images/cams/cam-1.png";
import AvatarTwo from "../../images/cams/cam-2.png";

const PopupAnimation = keyframes`
    from {
        opacity: 0;
        transform: scale(0);
    };
    to{
        opacity: 1;
        transform: scale(1);
    }
`;

const Container = styled.section`
  width: 600px;
  perspective: 1200px;
  position: relative;
`;

const Transform = styled.div`
  width: 100%;
  transform: rotate3d(0.5, -0.866, 0, 15deg) rotateZ(-1deg);
  -webkit-box-shadow: 10px 10px 25px 5px rgba(0, 0, 0, 0.35);
  box-shadow: 10px 10px 25px 5px rgba(0, 0, 0, 0.35);
`;

const Editor = styled.div`
  width: 100%;
  background-color: #3b4252;
  font-family: "Source Code Pro", monospace;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid #4e525c;
  position: relative;
`;

const KeyWord = styled.span`
  color: #5e81ac;
`;

const Name = styled.span`
  color: #88c0d0;
`;

const Text = styled.span`
  color: #8fbcbb;
`;

const Normal = styled.span`
  color: #eceff4;
`;

const Function = styled.div`
  font-family: inherit;
  animation: ${PopupAnimation} 1s;
  /* transform: scale(0); */
  &:nth-child(2) {
    animation-delay: 1s;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  > *:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const Line = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: inherit;
`;

const IndentedLine = styled(Line)`
  margin-left: 20px;
`;

const Blur = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  height: 1rem;
  width: ${(props) => `${props.width}px`};
  border-radius: 7px;
`;

const ImageContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 20px;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  transition: all 0.2s;
  -webkit-box-shadow: 5px 5px 22px 4px rgba(0, 0, 0, 0.51);
  box-shadow: 5px 5px 22px 4px rgba(0, 0, 0, 0.51);
  animation: ${PopupAnimation} 1s;
  &:not(:last-child) {
    margin-right: 40px;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export default function Demo() {
  return (
    <Container>
      <Transform>
        <Editor>
          <Function>
            <Line>
              <KeyWord>def </KeyWord>
              <Name>hello_world </Name>
              <Normal>():</Normal>
            </Line>
            <IndentedLine>
              {"\t"}
              <KeyWord>print</KeyWord>
              <Normal>("</Normal>
              <Text>Hello World</Text>
              <Normal>")</Normal>
            </IndentedLine>
          </Function>
          <Function>
            <Line>
              <KeyWord>def </KeyWord>
              <Name>fizz_buzz </Name>
              <Normal>():</Normal>
            </Line>
            <IndentedLine>
              <Blur width={200} />
            </IndentedLine>
            <IndentedLine>
              <Blur width={150} />
            </IndentedLine>
            <IndentedLine>
              <Blur width={210} />
            </IndentedLine>
            <IndentedLine>
              <Blur width={200} />
            </IndentedLine>
          </Function>
          <Function>
            <Line>
              <KeyWord>def </KeyWord>
              <Name>main </Name>
              <Normal>():</Normal>
            </Line>
            <IndentedLine>
              <Blur width={200} />
            </IndentedLine>
            <IndentedLine>
              <Blur width={150} />
            </IndentedLine>
            <IndentedLine>
              <Blur width={210} />
            </IndentedLine>
            <IndentedLine>
              <Blur width={200} />
            </IndentedLine>
          </Function>
        </Editor>
      </Transform>
      <ImageContainer>
        <Image alt="Video Conference Illustration - Female" src={AvatarOne} />
        <Image alt="Video Conference Illustration - Male" src={AvatarTwo} />
      </ImageContainer>
    </Container>
  );
}
