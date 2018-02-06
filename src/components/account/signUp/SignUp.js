import html from './sign-up.html';
import './signUp.css';
import Template from '../../Template';
import { db, auth } from '../../../services/firebase';

const template = new Template(html);
const users = db.ref('users');

export default class SignUp {

  handleSubmit(form) {
    const isArtist = form.elements.check.value === 'yes';
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

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



  render() {
    const dom = template.clone();

    
    dom.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    return dom;
  }
}