import html from './trending.html';
import './trending.css';
import ItemsList from './itemsList/ItemsList';
import Template from '../Template';

const template = new Template(html);

export default class Trending {

  render() {
    const dom = template.clone();

    dom.querySelector('.items-list').appendChild(new ItemsList().render());

    return dom;
  }

  unrender() {

  }
}