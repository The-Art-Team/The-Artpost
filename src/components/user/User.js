import Template from '../Template';
import html from './user.html';
import './user.css';
import { removeChildren } from '../dom';

const template = new Template(html);

export default class User {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}