import html from './log-in.html';
import './login.css';
import Template from '../Template';

const template = new Template(html);

export default class LogIn {

  render() {
    const dom = template.clone();

    return dom;
  }
}