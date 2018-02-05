import html from './header.html';
import './header.css';
import Search from './search/Search';
import Template from '../../Template';

const template = new Template(html);

export default class Header {

  render() {
    const dom = template.clone();

    const searchBox = dom.getElementById('search');
    const search = new Search(searchTerm => this.handleSearch(searchTerm));
    searchBox.appendChild(search.render());

    return dom;
  }
}