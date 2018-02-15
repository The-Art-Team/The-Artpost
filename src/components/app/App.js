import Template from '../Template';
import html from './app.html';
import './app.css';
import Header from './header/Header';
import Footer from './footer/Footer';
// I don't think this is used???
// import Auth from '../auth/Auth';
import Home from '../home/Home';
import Account from '../account/Account';
import Signin from '../account/Signin';
import User from '../user/User';
import TrendingList from '../trending/TrendingList';
import Results from '../results/Results';
import Items from '../detail/Items';
import { auth } from '../../services/firebase';
import { removeChildren } from '../dom';
import SignUp from '../account/signUp/SignUp';
import Login from '../account/login/Login';
import CategoryList from '../category/CategoryList';

const template = new Template(html);

// Hash Navigation
const map = new Map();
// map.set('#auth', { Component: Auth, isPublic: true });
map.set('#trending', { Component: TrendingList, isPublic: true });
map.set('#account', { Component: Account, isPublic: true });
map.set('#signin', { Component: Signin, isPublic: true });
map.set('#user', { Component: User, isPublic: false });
map.set('#results', { Component: Results, isPublic: true });
map.set('#Login', { Component: Login, isPublic: true });
map.set('#SignUp', { Component: SignUp, isPublic: true });
map.set('#category', { Component: CategoryList, isPublic: true });
map.set('#items', { Component: Items, isPublic: true });
const homepage = { Component: Home, isPublic: true };

export default class App {

  constructor() {
    this.hashChange = () => this.setPage();
    window.addEventListener('hashchange', this.hashChange);

    let authed = false;

    auth.onAuthStateChanged(user => {
      this.user = user;
      if(!authed) {
        authed = true;  
        this.setPage();
      }  

      if(!user && !this.page.isPublic) {
        window.location.hash = '#';
      }
    });
  }

  setPage() {
    const { hash } = window.location;
    const routes = hash.split('/');
    const route = routes[0];
   
    if(this.page && route === this.page.route && route != '#category') return;
    if(this.page && this.page.component && this.page.component.unrender) this.page.component.unrender();
    removeChildren(this.main);

    const { Component, isPublic } = map.get(route) || homepage;
    
    let component = null;

    if(!isPublic && !this.user) {
      window.location.hash = `#auth/${encodeURIComponent(hash)}`;
    }

    else {
      component = new Component();
    
      this.page = { route, component, isPublic };
      this.main.appendChild(component.render());
    }

  }

  render() {
    const dom = template.clone();
    dom.querySelector('header').appendChild(new Header().render());
    this.main = dom.querySelector('main');
    dom.querySelector('footer').appendChild(new Footer().render());

    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}