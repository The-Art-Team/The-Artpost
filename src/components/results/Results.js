import html from './results.html';
import './results.css';
import SearchList from './searchList/SearchList.js';
import Template from '../Template';
import { db } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');

// I think component isn't used or is a work in progress?????
export default class Results {

  handleSearch(searchTerm) {
    this.searchTerm = searchTerm;
    this.runSearch();
  }

  runSearch() {
    items(this.searchTerm)
      .then(data => {
        const itemResults = items.name;
        const categoryResults = items.category;
      
        const itemSection = this.itemSection;

        while(itemSection.hasChildNodes()) {
          itemSection.removeChild(itemSection.lastChild);
        }

        const searchList = new Results(itemResults, categoryResults);
        itemSection.appendChild(searchList.render());
      });
  }

  render() {
    const dom = template.clone();

    dom.getElementById('search-list').appendChild(new SearchList().render());

    return dom;
  }
}