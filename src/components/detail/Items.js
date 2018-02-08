import Template from '../Template';
import html from './items.html';
import './items.css';
import ItemDetail from './ItemDetail';
import { removeChildren } from '../dom';
import { db } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');

export default class Items {

  constructor() {
    this.hashChange = () => this.setChildPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setChildPage() {
    const routes = window.location.hash.split('/');
    const childPage = routes[1] || '';
    if(this.childPage === childPage) return;

    this.childPage = childPage;
    if(this.childComponent) this.childComponent.unrender();
    console.log(items.child);
    
    removeChildren(this.section);

    let childComponent;
    if(childPage) childComponent = new ItemDetail(childPage);

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