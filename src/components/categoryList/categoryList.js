import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./categoryList.scss";
import { Container, Row, Col } from 'reactstrap';

class CategoryList extends Component {
  render() {
    const WrkshpCategories = this.props.categories.map((category, index) => {
      return (
        <Col key={index} sm="12" md="3" >
          <Link
            to={{
              pathname: `/workshops/categories/${category.id}/${category.name}`,
              category,
              state: this.props.workshop
            }}

            className="categoryList-card"
          >

            <b>{category.name}</b>

          </Link>
        </Col>
      );
    });

    return (
      <Container>
        <Row className="">{WrkshpCategories}</Row>
      </Container>
    );
  }
}

export default CategoryList;

CategoryList.defaultProps = {
  categories: []
}
