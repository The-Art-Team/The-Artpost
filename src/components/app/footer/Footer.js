import html from './footer.html';
import './footer.css';
import Template from '../../Template';

const template = new Template(html);

export default class Footer {

  render() {
    const dom = template.clone();

    return dom;
  }
}