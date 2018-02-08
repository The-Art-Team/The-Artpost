import html from './image.html';
import './image.css';
import Template from '../../Template';
import { getUrl } from '../../../services/cloudinary';

const template = new Template(html);

export default class Image {
  constructor(src, onRemove) {
    this.src = src;
    this.onRemove = onRemove;
  }

  render() {
    const dom = template.clone();
    dom.querySelector('img').src = getUrl(this.src, 'ar_3:2,c_fill,w_500');
    
    const removeButton = dom.querySelector('button');
    
    if(this.onRemove) {
      removeButton.addEventListener('click', () => {
        this.onRemove();
      });
    }
    else {
      removeButton.remove();
    }

    return dom;
  }
}