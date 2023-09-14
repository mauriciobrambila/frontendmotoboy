import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Spinner } from 'react-bootstrap';

function SelectionBox({ source, dataKey, exhibitionField, selectFunction }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    function filterOnlyOneName(array) {
      return array.filter((item, index, self) => { return self.findIndex((el) => el.entrega === item.entrega) === index })
    }

    const fetchData = async () => {
      let response = await fetch(source, { method: "GET" })
      let result = await response.json();
      let newList = filterOnlyOneName(result)
      setData(newList)
      console.log(newList, data)
    }
    fetchData()
  })
  if (data.length === 0) {
    return <Spinner />
  }

  return (
    <Container>
      <Row md={12}>
        <Col>
          <Form.Select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {data.map((item) => (
              <option value={item[exhibitionField]}
                onClick={()=>{selectFunction(item[exhibitionField])}}
                key={item[dataKey]}>{item[exhibitionField]}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}
export default SelectionBox;
