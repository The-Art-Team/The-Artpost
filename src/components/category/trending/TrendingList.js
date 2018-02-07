import html from './trending-list.html';
import './trending.css';
import ItemsList from '../../itemsList/ItemsList';
// import Trending from './Trending';
import Template from '../../Template';
import { db } from '../../../services/firebase';

const template = new Template(html);

export default class TrendingList {

  render() {
    const dom = template.clone();
    // items
    const items = db.ref('items');
    dom.querySelector('article').appendChild(new ItemsList(items).render());

    // category
    const print = db.ref('items').orderByChild('category').equalTo('print');
    dom.querySelector('article').appendChild(new ItemsList(print).render());

    return dom;
  }

  unrender() {

  }
}