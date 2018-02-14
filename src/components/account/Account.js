import Template from '../Template';
import html from './account.html';
import './account.css';
import { auth, db } from '../../services/firebase';

const users = db.ref('users');
const template = new Template(html);

export default class Account {
 
  constructor() {
    // 1) on the off chance that someone hits the "logout" button,
    // we want to be able to unsubscribe the listener, so we can
    // make the firebase reference here in the constructor.
    // 2) if you just need the name, narrow the scope to that node:
    this.userName = users.child(auth.currentUser.uid).child('name');
  }

  render() {
    const dom = template.clone();
    
    const userHeading = dom.querySelector('.user-name');

    this.onValue = this.userName.on('value', data => {
      userHeading.textContent = data.val();
    });

    dom.querySelector('.sign-out').addEventListener('click', () => {
      auth.signOut();
      window.location.hash = '#';
    });

    return dom;
  }

  // Don't forget to unregister any firebase listeners
  unrender() {
    this.userName.off('value', this.onValue);
  }
}