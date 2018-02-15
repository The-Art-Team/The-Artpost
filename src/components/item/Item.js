import Template from '../Template';
import html from './item.html';
import './item.css';
import { db } from '../../services/firebase';
import { getUrl } from '../../services/cloudinary';

const template = new Template(html);
const items = db.ref('items');
const itemsImages = db.ref('items-images');

export default class Item {
  constructor(key) {
    this.key = key;
    this.item = items.child(key);
    // Given that each item only has one image, would have been 
    // simpler in your case to just give url property to item
    this.itemsImages = itemsImages.child(key).limitToFirst(1);
  }

  render() {
    const dom = template.clone();

    dom.querySelector('a').href = `#items/${this.key}`;
    this.caption = dom.querySelector('h3');
    this.image = dom.querySelector('img');

    this.onValue = this.item.on('value', data => {
      const item = data.val();
      this.caption.textContent = item.name;
    });

    this.onImageValue = this.itemsImages.on('child_added', data => {
      // use for cloudinary below
      // but all your images will be 500px square! no srcset for retina?
      this.image.src = getUrl(data.val(), 'c_fill,w_500,h_500');
      this.image.alt = this.caption.textContent;
    });

    return dom;
  }

  unrender() {
    this.item.off('value', this.onValue);
    this.itemsImages.off('child_added', this.onImageValue);    
  }
}