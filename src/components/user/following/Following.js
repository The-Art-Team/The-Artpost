import Template from '../Template';
import html from './following.html';
import './following.css';
import { removeChildren } from '../dom';

const template = new Template(html);

export default class Following {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}