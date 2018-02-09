import Template from '../../Template';
import html from './following.html';
import './following.css';
// import { removeChildren } from '../dom';
import ItemsList from '../../itemsList/ItemsList';
import { db, auth, storage } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');

export default class Following {

  render() {
    const dom = template.clone();

    this.list = new ItemsList(itemsByUser.child(auth.currentUser.uid));
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
}