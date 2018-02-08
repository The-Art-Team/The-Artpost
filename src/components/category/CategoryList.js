import Template from '../Template';
import html from './category-list.html';
// import './myart.css';
import ItemsList from '../itemsList/ItemsList';
import { db } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
// const itemsByUser = db.ref('itemsByUser');
// const itemsImages = db.ref('items-images');
// const itemsImageStorage = storage.ref('items');

export default class CategoryList {
  
  constructor() {
    const routes = window.location.hash.split('/');
    const category = routes[1] || '';
    this.categoryItems = items.orderByChild('category').equalTo(category);
  }
  
  render() {
    const dom = template.clone();

    this.list = new ItemsList(this.categoryItems);
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
  unrender() {
    this.list.unrender();
  }
}