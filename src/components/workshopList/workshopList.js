import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../navbar";
import { getWorkshopList } from "../../api";
import "./workshoplist.scss";
import { Container, Row, Col } from 'reactstrap';


class WorkshopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      workshops: []
    };
  }

  componentDidMount() {
    getWorkshopList(this.props.computedMatch.params.id).then(data => {
      this.setState({
        workshops: data.data,
        title: this.props.computedMatch.params.title
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getWorkshopList(this.props.computedMatch.params.id).then(data => {
        this.setState({
          workshops: data.data,
          title: this.props.computedMatch.params.title
        });
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <h1 className="">
                {this.state.title}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <section className="">
                <div className="">
                  {this.state.workshops.map(workshop => (
                    <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
                  ))}
                </div>
              </section>
            </Col>
          </Row>

        </Container>


      </Fragment>
    );
  }
}

export default WorkshopList;
