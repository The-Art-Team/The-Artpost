import Template from '../Template';
import html from './upload.html';
import './upload.css';
import { removeChildren } from '../dom';

const template = new Template(html);

export default class Upload {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}