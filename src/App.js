import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Products from './components/products/Products';
import ProductsDetails from './components/products/ProductsDetails';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import SigninSignup from './components/signinSignup/SigninSignup';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      this.setState({currentUser: userAuth});
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Navbar currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/botani" component={Home}/>
          <Route exact path="/botani/home" component={Home}/>
          <Route exact path="/botani/about" component={About} />
          <Route exact path="/botani/products" component={Products} />
          <Route exact path="/botani/products/:name" component={ProductsDetails}/>
          <Route exact path="/botani/contact" component={Contact} />
          <Route exact path="/botani/signin" component={SigninSignup} />
        </Switch>
        <Footer />
      </div>
    );
  }
  
}

export default App;
