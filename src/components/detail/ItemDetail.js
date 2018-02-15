import Template from '../Template';
import html from './item-detail.html';
import Image from './Image';
import heart from './heart.png';
import heartRed from './heart-red.png';

import './item-detail.css';
import { auth, db, storage } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');
const users = db.ref('users');

export default class ItemDetail {

  constructor(key) {
    this.key = key;
    this.item = items.child(key);
  }

  // you would launch the modal based on user clicking remove
  showConfirmModal() {
    // This method launch the modal, passing in two functions that lead to two possible results:
    // 1) remove function is called which triggers this.removeItem()
    // 2) cancel function is called which just closes the modal
  }

  removeItem() {
    // TODO: improve
    if(!confirm('Remove?')) return;

    const storage = itemsImageStorage.child(this.key);
    storage.delete()
      .catch(err => {
        if(err.code === 'storage/object-not-found') return;
        console.error(err);
      });

    const updates = {
      [items.child(this.key).path]: null,
      [itemsImages.child(this.key).path]: null,
      [itemsByUser.child(auth.currentUser.uid).child(this.key).path]: null
    };  
  
    db.ref().update(updates)
      .then(() => window.location.hash = '#user/myart')
      .catch(console.error);  

  }

  render() {
    const dom = template.clone();

    const header = dom.querySelector('h2');
    const bread = dom.querySelector('h5');
    const text = dom.querySelector('p');
    const imageSection = dom.querySelector('section.images');
    const removeButton = dom.querySelector('button.remove');
    const fav = dom.querySelector('.fav-flex');
    const byArtist = dom.querySelector('.by-artist');
    this.favWrapper = dom.querySelector('.favwrapper');
    this.heart = dom.querySelector('.heart');

    // None of this functionality requires knowing the item data.
    // Issue is that the `this.item.on('value')` will fire multiple 
    // times when the data changes!

    this.favHeader = fav.querySelector('.fav');
    const { currentUser } = auth;

    if(currentUser) {
      this.favoriteRef = users
        .child(currentUser.uid)
        .child('favorites')
        .child(this.key);

      fav.addEventListener('click', () => {
        this.favoriteRef.transaction(current => {
          return current ? null : true ;
        });
      });

      this.onFavoriteValue = this.favoriteRef.on('value', (data) => {
        const isFavorite = data.val();
        this.favHeader.innerHTML = isFavorite ? '<span class="red">remove favorite</span>' : 'add to favorite';
        this.heart.src = isFavorite ? heartRed : heart;
      });

    } else {
      this.favWrapper.classList.toggle('hideFav');
    }

    this.onValue = this.item.on('value', data => {
      const item = data.val();
      // we might have deleted:
      if(!item) return;

      bread.innerHTML = `<a href="#home">home </a> > <a href="#category/${item.category}"> ${item.category} </a> > <a href="#items/${this.key}"> ${item.name}</a>`;
      header.textContent = `${item.name}`;
      text.textContent = `${item.description}`;
      
      users.child(item.owner).child('name').once('value', (data) => {
        byArtist.textContent = `Created by: ${data.val()}`;
      });

      const isOwner = currentUser && item.owner === currentUser.uid;
      this.images = new Image(this.key, isOwner);
      imageSection.append(this.images.render());

      if(isOwner) {
        removeButton.addEventListener('click', () => {
          this.removeItem();
          // so instead call:
          // this.showConfirmModal();
        });
      }
      else {
        removeButton.remove();
      }

    });
    return dom;
  }

  unrender() {
    this.favoriteRef.off('value', this.onFavoriteValue);
    this.item.off('value', this.onValue);
    this.images.unrender();
  }
}