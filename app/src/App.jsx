import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL = 'http://localhost:9000';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterdata, setFilterdata] = useState(null);
  const [selectbtn, setSelectbtn] = useState(null);

  useEffect(() => {
    const FoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();

        setData(json);

        setFilterdata(json);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong');
        setLoading(false);
      }
    };
    FoodData();
  }, []);

  const filter = e => {
    const value = e.target.value;
    console.log(value);
    if (value) {
      const filterData = data?.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterdata(filterData);
    } else {
      setFilterdata(data);
    }
  };

  const filterbtn = type => {
    if (type == 'all') {
      setFilterdata(data);
      setSelectbtn('all');
      return;
    }

    const filterbtn = data?.filter(item =>
      item.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterdata(filterbtn);
    setSelectbtn(type);
  };

  const filterbutton = [
    {
      name: 'All',
      type: 'all',
    },
    {
      name: 'Breakfast',
      type: 'Breakfast',
    },
    {
      name: 'Lunch',
      type: 'Lunch',
    },
    {
      name: 'Dinner',
      type: 'Dinner',
    },
  ];

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
            <input
              className="input"
              onKeyUp={filter}
              type="text"
              placeholder="Search Here..."
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterbutton.map(button => (
            <Button
              key={button.name}
              onClick={() => filterbtn(button.type)}
              isSelected={button.type === selectbtn}
            >
              {button.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      <SearchResult data={filterdata} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .input {
    background: #323334;
    color: white;
    font-weight: 400px;
    font-size: 16px;
    border: 1px solid red;
    border-radius: 5px;
    padding: 8px 15px;
    border: 1 px solid #ff0909;
    &::placeholder {
      color: white;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height : 100px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  height: 120px;
`;
export const Button = styled.button`
  background: ${({ isSelected }) =>
    isSelected ? 'rgb(216, 10, 10)' : '#ff4343'};
  outline: 1px solid #ff4343;
  border: none;
  color: white;
  font-weight: 400px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  padding: 6px 12px;
  &:hover {
    background: rgb(216, 10, 10);
  }
`;
