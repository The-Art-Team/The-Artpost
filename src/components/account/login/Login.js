import html from './login.html';
import Template from '../../Template';
import { auth } from '../../../services/firebase';

const template = new Template(html);

export default class Login {

  handleSubmit(form) {
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success');
      })
      .then(() => {
        window.location.hash = '#';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const dom = template.clone();

    dom.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    return dom;
  }
}