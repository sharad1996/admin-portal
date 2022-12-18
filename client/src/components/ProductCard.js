import Card from "react-bootstrap/Card";
import Prod1 from "../assets/prod1.jpeg";
import Prod2 from "../assets/prod2.jpeg";
import Prod3 from "../assets/prod3.jpeg";
import Prod4 from "../assets/prod4.jpeg";

function ProductCard({ product }) {
  const randomNumber = () => {
    return Math.random() * (4 - 1);
  };
  const getRandomImg = () => {
    const number = randomNumber();
    switch (number) {
      case 1:
        return Prod1;
      case 2:
        return Prod2;
      case 3:
        return Prod3;
      case 4:
        return Prod4;
      default:
        return Prod1;
    }
  };
  const randomImage = getRandomImg();
  return (
    <Card style={{ width: "24rem" }}>
      <Card.Img variant="top" src={randomImage} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Title>{product.price}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
