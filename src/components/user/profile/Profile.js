import Template from '../../Template';
import html from './profile.html';
import './profile.css';
import { db, auth } from '../../../services/firebase';

const template = new Template(html);
const users = db.ref('users');

export default class Profile {

  constructor() {
    this.myUser = users.child(auth.currentUser.uid);
  }

  handleSubmit(form) {
    this.error.textContent = '';

    const data = new FormData(form);
    const updateObj = {};
    data.forEach((value, key) => updateObj[key] = value);    

    this.myUser.update(updateObj)
      .then(() => {
        this.error.textContent = 'Bio has been updated';
      })
      .catch(err => this.error.textContent = err);
  }

  render() {
    const dom = template.clone();
    this.description = dom.querySelector('#description');
    this.contact = dom.querySelector('#contact');

    users.child(auth.currentUser.uid).once('value', data => {
      const user = data.val();
      const userBio = user.bio || '';
      const userContact = user.contact || '';
      this.description.value = userBio;
      this.contact.value = userContact;
     
    });

    this.error = dom.querySelector('.error');
    this.form = dom.querySelector('form');
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    
    return dom;
  }
}