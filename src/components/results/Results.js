import html from './results.html';
import './results.css';
import Template from '../Template';

const template = new Template(html);

export default class Results {

  render() {
    const dom = template.clone();

    
    return dom;
  }
}