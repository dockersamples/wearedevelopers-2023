import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import { TodoListCard } from "./components/TodoListCard";

export function App() {
  return (
      <Container>
          <Row>
              <Col md={{ offset: 3, span: 6 }}>
                  <TodoListCard />
              </Col>
          </Row>
      </Container>
  );
}