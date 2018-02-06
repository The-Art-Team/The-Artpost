import html from './login.html';
import './login.css';
import Template from '../../Template';

const template = new Template(html);

export default class Login {

  render() {
    const dom = template.clone();

    return dom;
  }
}