import Template from '../Template';
import html from './signin.html';
import './signin.css';
import Login from './login/Login.js';
import SignUp from './signUp/SignUp.js';
import { auth } from '../../services/firebase';
import { removeChildren } from '../dom';

const template = new Template(html);

// Signin was a bit confusing at first,
// Thought it was duplicate of login, but it is 
// a parent of both
export default class Signin {
  constructor() {
    this.hashChange = () => this.setChildPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setChildPage() {
    const routes = window.location.hash.split('/');
    const childPage = routes[1] || '';
    if(this.childPage === childPage) return;

    this.childPage = childPage;
    if(this.childPage && this.childPage.childComponent && this.childPage.childComponent.unrender) this.childPage.childComponent.unrender();
    removeChildren(this.section);

    let childComponent;
    if(childPage === 'SignUp') childComponent = new SignUp();
    else childComponent = new Login();

    this.childComponent = childComponent;
    this.section.appendChild(childComponent.render());
  }
  render() {
    const dom = template.clone();

    this.section = dom.querySelector('section');
    this.setChildPage();

    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}