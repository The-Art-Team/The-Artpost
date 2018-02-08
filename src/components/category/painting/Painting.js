import html from './painting.html';
import './painting.css';
import Template from '../../Template';
import { db } from '../../../services/firebase';
import { getUrl } from '../../../services/cloudinary';

const items = db.ref('items');
const itemsImages = db.ref('items-images');

const template = new Template(html);

export default class Painting {

  constructor(key) {
    this.key = key;
    this.item = items.child(key);
    this.itemImages = itemsImages.child(key).limitToFirst(1);
  }

  update(item) {
    this.caption.textContent = `${item.name} / ${item.category}`;
    this.image.alt = item.name;
  }

  render() {
    const dom = template.clone();
    
    dom.querySelector('a').href = `#items/${this.key}`;
    this.caption = dom.querySelector('h2');
    this.image = dom.querySelector('img');

    this.onValue = this.item.on('value', data => {

      this.update(data.val());
    });
    
    this.onImageValue = this.itemImages.on('child_added', data => {
      this.image.src = getUrl(data.val(), 'ar_3:2,c_fill,w_500');
    });

    return dom;
  }

  unrender() {
    this.item.off('value', this.onValue);
    this.itemImages.off('child_added', this.onImageValue);
  }
}