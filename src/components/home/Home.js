import html from './home.html';
import './home.css';
import Slider from './slider/Slider';
import Category from './category/Category';
import Template from '../Template';
import Featured from './featured/Featured';

const template = new Template(html);

export default class Home {

  render() {
    const dom = template.clone();

    dom.querySelector('ul').appendChild(new Category().render());
    dom.querySelector('#slider').appendChild(new Slider().render());
    dom.querySelector('ul').appendChild(new Featured().render());
    
    return dom;
  }

  unrender() {

  }
}