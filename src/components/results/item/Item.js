import Template from '../../Template';
import html from './item.html';
import './item.css';
import Image from './Image';
import { db } from '../../../services/firebase';
import { getUrl } from '../../../services/cloudinary';

const template = new Template(html);
const itemsImages = db.ref('items-images');

export default class Item {
  constructor(key, item) {
    this.key = key;
    this.item = item;
    this.itemsImages = itemsImages.child(key).limitToFirst(1);
  }

  update(item) {
    this.caption.textContent = `${item.name}`;
    // this.image.alt = item.name;
  }

  render() {
    const dom = template.clone();

    // dom.querySelector('.item-detail') = `#results/${this.key}`;    
    // this.itemDetail = dom.querySelector('.item-detail');
    this.caption = dom.querySelector('h2');
    this.image = dom.querySelector('img');

    // this.onValue = this.itemImages.on('child_added', data => {
    //   this.image.src = getUrl(data.val(), 'c_fill,w_500,h_500');
    // });

    this.update(this.item);

    return dom;
  }

  unrender() {
    this.itemImages.off('child_added', this.onValue);    
  }
}