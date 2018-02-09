import Template from '../../Template';
import html from './favorites.html';
import './favorites.css';
// import { removeChildren } from '../dom';
import ItemsList from '../../itemsList/ItemsList';
import { db, auth, storage } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');
const users = db.ref('users');

export default class Favorites {

  render() {
    const dom = template.clone();

    this.list = new ItemsList(users.child.key.favorites(auth.currentUser.uid));
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
}