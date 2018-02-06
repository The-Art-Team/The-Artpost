import html from './itemsList.html';
import './itemslist.css';
import Template from '../../Template';

const template = new Template(html);

export default class ItemsList {

  render() {
    const dom = template.clone();

    return dom;
  }

  unrender() {

  }
}