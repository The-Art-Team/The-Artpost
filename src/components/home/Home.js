import html from './home.html';
import './home.css';
import Slider from './slider/Slider';
import Category from './category/Category';
import Template from '../Template';

const template = new Template(html);

export default class Home {

  render() {
    const dom = template.clone();

    dom.querySelector('ul').appendChild(new Category().render());
    dom.querySelector('#slider').appendChild(new Slider().render());

    return dom;
  }

  unrender() {

  }
}