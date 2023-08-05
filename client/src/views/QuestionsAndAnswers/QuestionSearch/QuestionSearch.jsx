import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../../components/Search';
import { useGlobalContext } from '../../../contexts/GlobalStore';


function QuestionSearch({
  setFilteredQuestions,
}) {
  console.log('[QuestionSearch] is running');
  const {
    questions,
  } = useGlobalContext();
  // would move this to search component,
  // search function to search component or useSearch hook,
  // and pass in array of objects that include body to search in and id

  // could also just pass through starting slice or final questions array
  // const startingSlice = (pageNum - 1) * itemsPerPage;

  // might want to memoize or cache all questions and filtered questions
  // useMemo(() => {
  // }, [])

  // cache:
  // all questions => DONE as part of questions state

  const searchQuestions = (searchTerm) => {
    const searchResults = [];
    Object.values(questions).forEach((question) => {
      const searchBody = question.question_body.toLowerCase();
      if (searchBody.includes(searchTerm)) {
        searchResults.push(question);
      }
    });
    console.log('searched questions');
    setFilteredQuestions(searchResults);
  };

  const handleClearResults = () => {
    setFilteredQuestions(questions);
  };

  return (
    <Search
      placeholder="Have a Question? Search For Answers..."
      handleSearch={searchQuestions}
      handleClearSearch={handleClearResults}
    />
  );
}

QuestionSearch.propTypes = {
  setFilteredQuestions: PropTypes.func.isRequired,

};

export default QuestionSearch;
