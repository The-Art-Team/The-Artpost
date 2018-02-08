import html from './painting-list.html';
import './painting.css';
import ItemsList from '../../itemsList/ItemsList';
// import Painting from './Painting';
import Template from '../../Template';
import { db } from '../../../services/firebase';
import { getUrl } from '../../../services/cloudinary';

const template = new Template(html);
const items = db.ref('items');
const itemsImages = db.ref('items-images');

export default class PaintingList {

  constructor() {
    this.key = key;
    // console.log(this.key);
    this.item = items;
    this.itemImages = itemsImages.limitToFirst(1);
  }

  // update(item) {
  //   this.caption.textContent = `${this.item.name} / ${this.item.category}`;
  //   this.image.alt = item.name;
  // }

  render() {
    const dom = template.clone();

    dom.querySelector('a').href = `#items/${this.key}`;
    this.caption = dom.querySelector('h2');
    this.image = dom.querySelector('img');

    // this.onValue = this.item.on('value', data => {

    //   this.update(data.val());
    // });
    
    this.onValue = this.itemImages.on('child_added', data => {
      this.image.src = getUrl(data.val(), 'ar_3:2,c_fill,w_500');
    });


    // category
    const painting = this.item.orderByChild('category').equalTo('painting');
    this.caption = `${this.item.name}`;

    dom.querySelector('article').appendChild(new ItemsList(painting).render());

    return dom;
  }

  unrender() {
    this.item.off('value', this.onValue);
    this.itemImages.off('child_added', this.onImageValue);
  }
}