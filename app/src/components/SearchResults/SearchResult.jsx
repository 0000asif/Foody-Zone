import styled from 'styled-components';
import { Button, Container } from '../../App';
import { BASE_URL } from '../../App';

const SearchResult = ({ data }) => {
  return (
    <FoodCardContainer>
      <Container>
        <FoodCards>
          {data?.map(item => (
            <FoodCard key={item.name}>
              <div className="image_preview">
                <img src={BASE_URL + item.image} alt="img" />
              </div>
              <div className="content">
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <Button>${item.price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          ))}
        </FoodCards>
      </Container>
    </FoodCardContainer>
  );
};

export default SearchResult;

const FoodCardContainer = styled.section`
  min-height: calc(100vh - 200px);
  background-image: url('/bg.png');
  background-size: cover;
`;

const FoodCards = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 32px;
  column-gap: 20px;
  padding-top: 60px;
`;
const FoodCard = styled.section`
  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);
  width: 342px;
  border-radius: 20px;
  display: flex;
  padding: 8px;
`;
