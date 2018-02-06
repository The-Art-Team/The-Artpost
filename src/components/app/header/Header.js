import html from './header.html';
import './header.css';
import Search from './search/Search';
import Account from '../../account/Account';
import { auth } from '../../../services/firebase';
import Template from '../../Template';
import { removeChildren } from '../../dom';


const template = new Template(html);

export default class Header {

  render() {
    const dom = template.clone();

    const searchBox = dom.getElementById('search');
    const search = new Search(searchTerm => this.handleSearch(searchTerm));
    searchBox.appendChild(search.render());

    const userItem = dom.querySelector('.user-nav');    

    auth.onAuthStateChanged(user => {
      let child = null;

      if(user) {
        child = new Account().render();
      }
      else {
        child = document.createElement('a');
        child.textContent = 'Sign In';
        child.href = '#auth';
        userItem.appendChild(child);
      }

      removeChildren(userItem);
      userItem.appendChild(child);
    });


    return dom;
  }
}