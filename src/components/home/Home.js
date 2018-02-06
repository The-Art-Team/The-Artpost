import html from './home.html';
import './home.css';
import Template from '../Template';

const template = new Template(html);

export default class Home {

  render() {
    return template.clone();
  }

  unrender() {

  }
}