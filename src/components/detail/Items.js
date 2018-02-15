import Template from '../Template';
import html from './items.html';
import './items.css';
import ItemDetail from './ItemDetail';
import { removeChildren } from '../dom';
import { db } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');

// Using "itemKey" instead of "childPage" makes this component easier to understand.
// Not really "Items", how about just Item?
export default class Items {

  constructor() {
    this.hashChange = () => this.setChildPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setChildPage() {
    const routes = window.location.hash.split('/');
    const itemKey = routes[1] || '';
    if(this.itemKey === itemKey) return;

    this.itemKey = itemKey;
    if(this.childComponent) this.childComponent.unrender();
    
    removeChildren(this.section);

    let childComponent;
    if(itemKey) childComponent = new ItemDetail(itemKey);

    this.childComponent = childComponent;
    this.section.appendChild(childComponent.render());
  }

  render() {
    const dom = template.clone();

    this.section = dom.querySelector('section');
    this.setChildPage();    

    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);    
  }
}