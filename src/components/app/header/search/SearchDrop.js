import html from './search-drop.html';
import './search-drop.css';
import Template from '../../../Template';

const template = new Template(html);

export default class SearchDrop {
  
  render() {
    const dom = template.clone();


    return dom;
  }
}