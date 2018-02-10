import Template from '../Template';
import html from './account.html';
import './account.css';
import { auth, db } from '../../services/firebase';

const users = db.ref('users');

const template = new Template(html);

export default class Account {
 
  render() {
    const dom = template.clone();
    
    const userHeading = dom.querySelector('.user-name');

    users.child(auth.currentUser.uid).on('value', data => {
      const user = data.val();
      userHeading.textContent = user.name;
    });

    dom.querySelector('.sign-out').addEventListener('click', () => {
      auth.signOut();
      window.location.hash = '#';
    });

    return dom;
  }

  unrender() {
  }
}