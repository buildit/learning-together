import React, { Component} from "react";
import { NavLink } from 'react-router-dom'
import { Hero } from "../hero";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";
import { FooterComponent } from "../footer"
import { getWorkshopList } from '../../api'
import './landing.scss';
import { NavbarComponent } from "../navbar";
import { loadCategories } from '../../api';
import { CarouselProvider, Slider, Slide, DotGroup, Dot} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: [],
      noslides: 0,
      error: null
    };
  }

  componentDidMount() {

    getWorkshopList()
      .then(response => {
        let workshops = response.data.slice(0,6)
        this.setState({ workshops })
        this.setState({noslides: this.getNumberofSlides()})
      })
      .catch(error => this.setState({ error: 'Please try again later' }))

    loadCategories()
      .then((data) => {

        this.setState({
          categories: data
        })
      })
      
  }

  getNumberofSlides(){
    
    if( window.matchMedia('(min-width: 40em) and (max-width: 63.9375em)').matches) {
      return 2
    } else if (window.matchMedia('(min-width: 64em)').matches) {
      return 3
    } else 
      return 1
  }

  render() {

    const { isUser, location } = this.props
    return (
      <div >
        <NavbarComponent isUser={isUser} location={location} />
        <Hero title="Better Together" isUser={isUser}/>
        <div className="grid-container landing-preview">
          <h2 className="section-title">Upcoming Workshops</h2>
          <CarouselProvider
            naturalSlideWidth={300}
            naturalSlideHeight={350}
            totalSlides={this.state.workshops.length}
            visibleSlides={this.state.noslides}
      > <DotGroup /> 
      <Slider>
          {this.state.workshops.map((workshop,index) => (
            <React.Fragment>
              <Slide key={index} index={index}>
                  <NavLink to={`/workshop/${workshop.id}`} className="preview-card" key={index}><PreviewComponent workshop={workshop} /></NavLink>
              </Slide>
            </React.Fragment>
          ))}

           </Slider>
           
            
      </CarouselProvider>
        </div>
        <div className="grid-container landing-preview">
          <h2 className="section-title">Categories</h2>
          <CategoryListComponent workshop={this.state.workshops} categories={this.state.categories} />
        </div>
        <FooterComponent isUser={isUser} userId={this.state.userId} />
      </div>

    );
  }
}


