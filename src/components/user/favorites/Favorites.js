import Template from '../../Template';
import html from './favorites.html';
import './favorites.css';
// import { removeChildren } from '../dom';

const template = new Template(html);

export default class Favorites {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}