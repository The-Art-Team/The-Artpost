import html from './trending-list.html';
import './trending.css';
import ItemsList from '../itemsList/ItemsList';
import Template from '../Template';
import { db } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsFavoriteCount = db.ref('itemsFavoriteCount');


export default class TrendingList {

  constructor() {
    this.item = items;
  }

  render() {
    const dom = template.clone();

    // trending items by count
    dom.querySelector('article').appendChild(new ItemsList(itemsFavoriteCount.orderByValue()).render());

    return dom;
  }

  unrender() {

  }
}