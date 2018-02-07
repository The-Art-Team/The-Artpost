import html from './header.html';
import './header.css';
import SearchDrop from './search/SearchDrop';
import Account from '../../account/Account';
// import Results from '../../results/Results';
import { auth, db } from '../../../services/firebase';
import Template from '../../Template';
import { removeChildren } from '../../dom';

// const users = db.ref('users');
const template = new Template(html);

export default class Header {

  

  render() {
    const dom = template.clone();

    dom.querySelector('#search-drop').appendChild(new SearchDrop().render());

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