import html from './sign-up.html';
import './signUp.css';
import Template from '../../Template';

const template = new Template(html);

export default class SignUp {

  render() {
    const dom = template.clone();

    return dom;
  }
}