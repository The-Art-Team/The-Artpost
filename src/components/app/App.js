import Template from '../Template';
import html from './app.html';
import './app.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Auth from '../auth/Auth';
import Home from '../home/Home';
import TrendingList from '../category/trending/TrendingList';
// import DigitalList from '../category/digital/DigitalList';
// import DrawingList from '../category/drawing/DrawingList';
// import PaintingList from '../category/painting/PaintingList';
// import PhotoList from '../category/photo/PhotoList';
// import PrintList from '../category/print/PrintList';
// import SculptureList from '../category/sculpture/SculptureList';
import Account from '../account/Account';
import Signin from '../account/Signin';
import User from '../user/User';
import Results from '../results/Results';
import { auth } from '../../services/firebase';
import { removeChildren } from '../dom';
import SignUp from '../account/signUp/SignUp';
import Login from '../account/login/Login';

const template = new Template(html);

// Hash Navigation
const map = new Map();
map.set('#auth', { Component: Auth, isPublic: true });
map.set('#trending', { Component: TrendingList, isPublic: true });
map.set('#account', { Component: Account, isPublic: true });
map.set('#signin', { Component: Signin, isPublic: true });
map.set('#user', { Component: User, isPublic: false });
map.set('#results', { Component: Results, isPublic: true });
map.set('#Login', { Component: Login, isPublic: true });
map.set('#SignUp', { Component: SignUp, isPublic: true });
// map.set('#digital', { Component: DigitalList, isPublic: true });
// map.set('#drawing', { Component: DrawingList, isPublic: true });
// map.set('#painting', { Component: PaintingList, isPublic: true });
// map.set('#photo', { Component: PhotoList, isPublic: true });
// map.set('#sculpture', { Component: SculptureList, isPublic: true });
// map.set('#print', { Component: PrintList, isPublic: true });


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
   
    if(this.page && route === this.page.route) return;
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