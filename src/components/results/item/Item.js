import Template from '../../Template';
import html from './item.html';
import './item.css';
// import Image from './Image';
import { db } from '../../../services/firebase';
// import { getUrl } from '../../../services/cloudinary';

const template = new Template(html);
const itemsImages = db.ref('items-images');

export default class Item {
  constructor(key, item) {
    this.key = key;
    this.item = item;
    this.itemsImages = itemsImages.child(key).limitToFirst(1);
  }

  // add text
  update(item) {
    this.caption.textContent = `${item.name}`;
    this.image.alt = item.name;
  }

  render() {
    const dom = template.clone();

    this.caption = dom.querySelector('h2');
    this.image = dom.querySelector('img');

    // add image use onvalue/data.val()
    this.onValue = this.itemsImages.on('child_added', data => {
      this.image.src = data.val();
      // use for cloudinary below
      // this.image.src = getUrl(data.val(), 'c_fill,w_500,h_500');
    });

    this.update(this.item);

    return dom;
  }

  unrender() {
    this.itemImages.off('child_added', this.onValue);    
  }
}