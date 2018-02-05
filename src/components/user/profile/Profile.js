import Template from '../Template';
import html from './profile.html';
import './profile.css';
import { removeChildren } from '../dom';

const template = new Template(html);

export default class Profile {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}