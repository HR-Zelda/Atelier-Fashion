const Search = styled.form`
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  color: #555;
`;
// cursor: pointer;
// &:hover {
//   font-weight: bold;
// };
// font-size: calc(10px + 1vw);
// align-self: center;

// TO-DO: make bigger on focus (for mobile)
// const Input = styled.input`
//   background-color: ${(props) => props.theme.secondaryColor};
//   color: ${(props) => props.theme.fontColor};
//   border: ${(props) => props.theme.fontColor} 1px solid;
//   border-radius: 2.5%;
//   &:focus {
//     outline: none;
//   }
//   width: 70%;
//   font-size: large;
// `;

const Input = styled.input`
  border: none;
  background: transparent;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
`;

// input[type="search"]::placeholder {
//   color: #bbb;
// }

// button[type="submit"] {

// }

// button[type="submit"]:hover {
//   opacity: 1;
// }

const SearchIcon = styled.button`
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  cursor: pointer;
  opacity: 0.7;
`;