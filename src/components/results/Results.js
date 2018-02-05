import html from './results.html';
import './results.css';
import SearchList from './searchList/SearchList.js';
import Template from '../Template';

const template = new Template(html);

export default class Results {

  render() {
    const dom = template.clone();

    dom.getElementById('search-list').appendChild(new SearchList().render());

    return dom;
  }
}