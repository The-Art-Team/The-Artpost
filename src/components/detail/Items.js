import Template from '../Template';
import html from './items.html';
import './items.css';
import ItemDetail from './ItemDetail';
// import { removeChildren } from '../dom';
// import { auth, db } from '../../services/firebase';

const template = new Template(html);

export default class Items {


  render() {
    const dom = template.clone();

    dom.querySelector('section').appendChild(new ItemDetail().render());

    return dom;
  }

  unrender() {

  }
}