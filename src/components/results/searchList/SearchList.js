/* is this component used anywhere? */
import html from './search-list.html';
import './searchList.css';
// import Item from '../item/Item';
import Template from '../../Template';
import { db } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');

export default class SearchList {
  constructor(list) {
    this.list = list || items;
  }


  render() {
    const dom = template.clone();

    const ul = dom.querySelector('ul');

    const map = new Map();

    this.childAdded = items.on('child_added', data => {
      const item = new Item(data.key, data.val());
      const itemDom = item.render();
      map.set(data.key, {
        component: item,
        nodes: [...itemDom.childNodes]
      });
    
      ul.appendChild(itemDom);
    });
    
    this.childRemoved = items.on('child_removed', data => {
      const toRemove = map.get(data.key);
      map.delete(data.key);
      toRemove.nodes.forEach(node => node.remove());
      toRemove.component.unrender();
    });
    
    this.childChange = items.on('child_changed', data => {
      map.get(data.key).component.update(data.val());
    });
    
    return dom;
  }

  unrender() {
    items.off('child_added', this.childAdded);
    items.off('child_removed', this.childRemoved);
    items.off('child_changed', this.childChange);
  }
}