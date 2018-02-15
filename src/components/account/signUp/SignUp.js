import html from './sign-up.html';
import Template from '../../Template';
import { db, auth } from '../../../services/firebase';

const template = new Template(html);
const users = db.ref('users');

export default class SignUp {

  // destructuring helps.with.reducing.long.chains.of.properties
  handleSubmit({ elements }) {
    const isArtist = elements.check.checked;
    const name = elements.name.value;
    const email = elements.email.value;
    const password = elements.password.value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return users.child(user.uid).set({
          name,
          isArtist
        });
      })
      .then(() => {
        window.location.hash = '#user';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // if you had created a specific "password" component, you could 
  // re-use in both signup and login
  handleToggleShowPassword() {
    const isPassword = this.password.type === 'password';
    this.password.type = isPassword ? 'text' : 'password';
    this.showPassword.textContent = isPassword ? 'Hide' : 'Show';
  }

  render() {
    const dom = template.clone();

    dom.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    // Submit true when all inputs are correct
    const form = dom.querySelector('form');
    const submit = dom.querySelector('button[type=submit');
    form.addEventListener('blur', event => {
      const element = event.srcElement;
      if(element.type === 'submit' || element.type === 'button') return;
      element.nextElementSibling.textContent = element.validationMessage;
      submit.disabled = !form.checkValidity();
    }, true);

    // Toggle show password listener
    this.showPassword = dom.querySelector('button[type=button]');
    this.showPassword.addEventListener('click', () => this.handleToggleShowPassword());

    // Password validator
    this.password = dom.querySelector('input[name=password]');
    this.password.addEventListener('keyup', event => {
      const target = event.target;
      target.setCustomValidity('');
      if(!target.checkValidity()) return;
      
      const valid = target.value.toLowerCase() !== target.value;
      if(!valid) {
        target.setCustomValidity('Password must contain at least one uppercase character');
      }
    });

    return dom;
  }
}