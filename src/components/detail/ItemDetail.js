import Template from '../Template';
import html from './item-detail.html';
import './item-detail.css';
import { auth, db, storage } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
// const itemsByUser = db.ref('itemsByUser');
// const itemsImages = db.ref('items-images');
// const itemsImageStorage = storage.ref('items');

export default class ItemDetail {

  constructor(key) {
    this.key = key;
    this.item = items.child(key);
  }


  render() {
    const dom = template.clone();

    const header = dom.querySelector('h2');
    const imageSection = dom.querySelector('section.images');

    this.onValue = this.pet.on('value', data => {
      const item = data.val();
      // we might have deleted:
      if(!item) return;

      header.textContent = `${item.name} the ${item.type}`;

      const isOwner = item.owner === auth.currentUser.uid;

      this.images = new Image(this.key, isOwner);
      imageSection.append(this.images.render());

    
    });
    return dom;
  }

  unrender() {
    items.child(this.key).off('value', this.onValue);
    this.images.unrender();
  }
}