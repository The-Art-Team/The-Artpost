import Template from '../Template';
import html from './category-list.html';
import './category-list.css';
import ItemsList from '../itemsList/ItemsList';
import { db } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');

export default class CategoryList {
  
  constructor() {
    const routes = window.location.hash.split('/');
    const category = routes[1] || '';
    this.categoryItems = items.orderByChild('category').equalTo(category);
    this.category = category;
    console.log(this.category);
  }
  
  render() {
    const dom = template.clone();

    const title = dom.querySelector('h2');
    title.textContent = this.category;

    const bread = dom.querySelector('h5');
    bread.innerHTML = `<a href="#home">home</a> > <a href="#category/${this.category}">${this.category}</a>`;

    this.list = new ItemsList(this.categoryItems);
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
  unrender() {
    this.list.unrender();
  }
}