import Template from '../../Template';
import html from './favorites.html';
import './favorites.css';
import ItemsList from '../../itemsList/ItemsList';
import { db, auth, storage } from '../../../services/firebase';

const template = new Template(html);
const users = db.ref('users');

export default class Favorites {

  render() {
    const dom = template.clone();

    this.list = new ItemsList(users.child(auth.currentUser.uid).child('favorites'));
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
}