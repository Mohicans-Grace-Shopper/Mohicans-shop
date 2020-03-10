/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as Products} from './Products';
export {default as SingleProduct} from './SingleProduct';
export {default as Users} from './Users';
export {default as SingleUser} from './SingleUser';
export {default as AddProduct} from './AddProduct';
export {default as Cart} from './cart';
export {default as OrderConfirmation} from './orderConfirmation';
export {default as ThankYou} from './ThankYou';
export {default as PurchaseHistory} from './PurchaseHistory';
