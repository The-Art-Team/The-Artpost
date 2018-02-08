import Template from '../../Template';
import html from './my-art.html';
import './myart.css';
import ItemsList from '../../itemsList/ItemsList';
import { db, auth, storage } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');

export default class MyArt {
  
  constructor() {

  }


  
  render() {
    const dom = template.clone();

    this.list = new ItemsList(itemsByUser.child(auth.currentUser.uid));
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
  unrender() {
    this.list.unrender();
  }
}