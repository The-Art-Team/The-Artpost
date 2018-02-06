import Template from '../../Template';
import html from './user.html';
import './user.css';
import Favorites from './favorites/Favorites';
import Following from './following/Following';
import Profile from './profile/Profile';
import Upload from './upload/Upload';
import { removeChildren } from '../dom';
import { auth, db } from '../../services/firebase';

const template = new Template(html);
const itemsByUser = db.ref('itemsByUser');

export default class User {

  constructor() {
    this.hashChange = () => this.setChildPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setChildPage() {
    const routes = window.location.hash.split('/');
   
    const childPage = routes[1] || '';
    if(this.childPage === childPage) return;

    this.childPage = childPage;
    if(this.childComponent) this.childComponent.unrender();
    removeChildren(this.section);

    let childComponent;
    if(childPage === 'upload') childComponent = new Upload();
    else if(childPage === 'my') childComponent = new UserList(itemsByUser.child(auth.currentUser.uid));
    else if(childPage) childComponent = new Following(childPage);
    else childComponent = new Profile();

    this.updateHeader(childPage === 'my');

    this.childComponent = childComponent;
    this.section.appendChild(childComponent.render());
  }

  render() {
    const dom = template.clone();

    this.header = dom.querySelector('h1');
    this.section = dom.querySelector('section');
    this.setChildPage();
    
    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}