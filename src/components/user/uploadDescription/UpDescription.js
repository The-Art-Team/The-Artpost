import Template from '../../Template';
import html from './upDescription.html';
import './upDescription.css';
// import { removeChildren } from '../dom';

const template = new Template(html);

export default class UpDescription {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}