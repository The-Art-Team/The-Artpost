import html from './itemsList.html';
import './itemslist.css';
import Item from '../item/Item';
import Template from '../Template';

const template = new Template(html);

export default class ItemsList {

  constructor(list) {
    this.list = list;
  }

  render() {
    const dom = template.clone();

    const ul = dom.querySelector('ul');

    const map = this.map = new Map();

    this.childAdded = this.list.on('child_added', data => {
      const item = new Item(data.key);

      const itemDom = item.render();
      map.set(data.key, {
        component: item,
        nodes: [...itemDom.childNodes]
      });

      ul.appendChild(itemDom);
    });

    this.childRemoved = this.list.on('child_removed', data => {
      const toRemove = map.get(data.key);
      map.delete(data.key);
      toRemove.nodes.forEach(node => node.remove());
      toRemove.component.unrender();
    });

    return dom;
  }

  unrender() {
    this.list.off('child_added', this.childAdded);
    this.list.off('child_removed', this.childRemoved);
    this.map.forEach(({ component }) => component.unrender());
  }
}