import html from './featured.html';
import './featured.css';
import Template from '../../Template';


const template = new Template(html);

export default class Featured {

  render() {
    const dom = template.clone();
    
    return dom;
  }
    
  unrender() {
    
  }
}