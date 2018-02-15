import html from './login.html';
import Template from '../../Template';
import { auth } from '../../../services/firebase';

const template = new Template(html);

export default class Login {

  handleSubmit({ elements }) {
    const email = elements.email.value;
    const password = elements.password.value;

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

    const form = dom.querySelector('form');
    // If you don't need access in another class method, you don't
    // need to add to `this`, just use a const variable
    const submit = dom.querySelector('button[type=submit');
    
    form.addEventListener('blur', event => {
      const element = event.srcElement;
      if(element.type === 'submit' || element.type === 'button') return;
      element.nextElementSibling.textContent = element.validationMessage;
      submit.disabled = !form.checkValidity();
    }, true);

    return dom;
  }
}