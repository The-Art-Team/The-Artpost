import html from './image.html';
import './image.css';
import Template from '../../../Template';
import { getUrl } from '../../../services/cloudinary';

const template = new Template(html);

export default class Image {
  constructor(src) {
    this.src = src;
  }

  render() {
    const dom = template.clone();
    
    this.image = dom.querySelector('img');
    this.image.alt = this.src;

    dom.querySelector('img').src = getUrl(this.src, 'c_fill,w_500,h_500');

    return dom;
  }
}