import Template from '../Template';
import html from './account.html';
import './account.css';
// import Login from './login/Login.js';
// import SignUp from './signUp/SignUp.js';
import { auth, db } from '../../services/firebase';
import { removeChildren } from '../dom';

const users = db.ref('users');

const template = new Template(html);

export default class Account {
  // constructor() {
  //   this.hashChange = () => this.setChildPage();
  //   window.addEventListener('hashchange', this.hashChange);
  // }

  // setChildPage() {
  //   const routes = window.location.hash.split('/');
  //   const childPage = routes[1] || '';
  //   if(this.childPage === childPage) return;

  //   this.childPage = childPage;
  //   if(this.childComponent) this.childComponent.unrender();
  //   removeChildren(this.section);

  //   let childComponent;
  //   if(childPage) childComponent = new Login(childPage);
  //   else childComponent = new SignUp();

  //   this.childComponent = childComponent;
  //   this.section.appendChild(childComponent.render());
  // }
  render() {
    const dom = template.clone();

    // this.section = dom.querySelector('section');
    // this.setChildPage();
    
    const userHeading = dom.querySelector('.user-name');

    users.child(auth.currentUser.uid).on('value', data => {
      const user = data.val();
      console.log('test', user.name);
      userHeading.textContent = user.name;
    });

    // const user = auth.currentUser;
    // console.log(user);
    
    // if(user.photoURL) dom.querySelector('.profile').src = user.photoURL;
  
    dom.querySelector('.sign-out').addEventListener('click', () => {
      auth.signOut();
    });

    return dom;
  }

  unrender() {
    // window.removeEventListener('hashchange', this.hashChange);
  }
}