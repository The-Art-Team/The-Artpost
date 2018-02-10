import Template from '../Template';
import html from './auth.html';
import { auth } from '../../services/firebase';

const template = new Template(html);

export default class Auth {
  constructor() {
    const routes = window.location.hash.split('/');
    this.redirect = decodeURIComponent(routes[1] || '#');
  }

  render() {
    const dom = template.clone();

    return dom;
  }

  unrender() {
  }
}