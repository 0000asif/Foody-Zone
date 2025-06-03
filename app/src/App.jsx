import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

export const BASE_URL = 'http://localhost:9000/';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const FoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong');
        setLoading(false);
      }
    };
    FoodData();
  }, []);

  console.log(data);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="" />
          </div>
          <div className="search">
            <input className="input" type="text" placeholder="Search Here..." />
          </div>
        </TopContainer>
        <FilterContainer>
          <Button>All</Button>
          <Button>Breakfast</Button>
          <Button>Lunch</Button>
          <Button>Dinner</Button>
        </FilterContainer>
      </Container>

      <SearchResult></SearchResult>
    </>
  );
};

export default App;

const Container = styled.div`
  background: #323334;
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 140px;
  .input {
    background: #323334;
    color: white;
    font-weight: 400px;
    font-size: 16px;
    border: 1px solid red;
    border-radius: 5px;
    padding: 6px 12px;
    border: 1 px solid #ff0909;
    &::placeholder {
      color: white;
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 140px;
`;
export const Button = styled.button`
  background: #ff4343;
  outline: 1px solid #ff4343;
  border: none;
  color: white;
  font-weight: 400px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 25px;
`;

const SearchResult = styled.section``;
