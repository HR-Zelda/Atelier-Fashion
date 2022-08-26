import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import QuestionEntry from './QuestionEntry/QuestionEntry';
import QuestionSearch from './QuestionSearch/QuestionSearch';
import ExtraButtons from './Extras/ExtraButtons';

function QuestionAndAnswers() {
  const { numQuestions, filteredQuestions, setNumQuestions } = useGlobalContext();

  function handleScroll(e) {
    // within 0.9 of the bottom
    const bottom = 0.9 * (e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight;
    if (bottom) {
      setNumQuestions((prev) => prev + 2);
    }
  }

  return (
    <Container id="question-and-answers">
      <QuestionSearch />
      <QuestionListContainer id="scrollable-container" onScroll={(e) => handleScroll(e)}>
        {numQuestions === 0 ? (
          <div>Be the first to ask a question!</div>
        ) : (
          filteredQuestions.map((question) => (
            <>
              <QuestionEntry
                question={question}
                key={`${question.question_id}`}
              />
              <hr/>
            </>
          ))
        )}
      </QuestionListContainer>
      <ExtraButtons />
    </Container>
  );
}

export default QuestionAndAnswers;

const Container = styled.div`
  // justify-content: center;
  justify-content: left;
  margin-top: 20px;
  // margin-left: 5%;
  // margin-right: 5%;
  grid-column: 2/12;
`;

const QuestionListContainer = styled.div`
  max-height: 75vh;
  overflow: auto;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  scroll-behavior: smooth;
`;
