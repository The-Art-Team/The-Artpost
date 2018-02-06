import Template from '../../Template';
import html from './upload.html';
import './upload.css';
// import { removeChildren } from '../dom';
import { db, auth } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');

export default class Upload {

  constructor(onAdd) {
    this.onAdd = onAdd;
    const currentUser = auth.currentUser;
    this.myItems = itemsByUser.child(currentUser.uid);
  }

  handleSubmit(form) {
    this.error.textContent = '';

    const data = new FormData(form);
    const item = {};
    data.forEach((value, key) => item[key] = value);    
    
    item.owner = auth.currentUser.uid;
    const ref = items.push();
    
    const updates = {
      [ref.path]: item,
      [this.myItems.child(ref.key).path]: true
    };

    db.ref().update(updates)
      .then(() => window.location.hash = `#items/${ref.key}`)
      .catch(err => this.error.textContent = err);
  }

  render() {
    const dom = template.clone();

    this.error = dom.querySelector('.error');

    this.form = dom.querySelector('form');
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    dom.querySelector('button[type=button]').addEventListener('click', event => {
      event.preventDefault();
      window.location.hash = '#user';
    });

    return dom;
  }
}