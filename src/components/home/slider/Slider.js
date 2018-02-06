import html from './slider.html';
import './slider.css';
import Template from '../../Template';

const template = new Template(html);

export default class Slider {

  render() {
    const dom = template.clone();

    return dom;
  }

  unrender() {

  }
}