import html from './trending.html';
import './trending.css';
import Template from '../Template';

const template = new Template(html);

export default class Trending {

  render() {
    const dom = template.clone();

    return dom;
  }
}