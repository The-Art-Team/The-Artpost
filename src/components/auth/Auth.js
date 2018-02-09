import Template from '../Template';
import html from './auth.html';
import { auth, providers } from '../../services/firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';


const ui = new firebaseui.auth.AuthUI(auth);

const template = new Template(html);

export default class Auth {
  constructor() {
    const routes = window.location.hash.split('/');
    console.log(routes, 'routes');
    this.redirect = decodeURIComponent(routes[1] || '#');
  }

  render() {
    const dom = template.clone();

    return dom;
  }

  unrender() {
  }
}