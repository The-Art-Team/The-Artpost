import html from './header.html';
import './header.css';
import Account from '../../account/Account';
import { auth } from '../../../services/firebase';
import Template from '../../Template';
import { removeChildren } from '../../dom';

const template = new Template(html);

export default class Header {

  render() {
    const dom = template.clone();

    this.nav = dom.querySelector('nav#main-menu');
    const checkbox = dom.querySelector('input');
    this.nav.addEventListener('click', () => {
      checkbox.click(
        checkbox.addEventListener('change', event => {
          event.preventDefault();
        })
      );
    });

    const userItem = dom.querySelector('.user-nav');
    auth.onAuthStateChanged(user => {
      let child = null;

      if(user) {
        child = new Account().render();
      }
      else {
        child = document.createElement('a');
        child.textContent = 'Sign In';
        child.href = '#signin';
        userItem.appendChild(child);
      }

      removeChildren(userItem);
      userItem.appendChild(child);
    });

    return dom;
  }
}