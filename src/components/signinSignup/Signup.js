import React, {Component} from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    async handleSubmit(event) {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        return (
            <div className="my-4 mx-5">
                <h3>I do not have an account</h3>
                <span>Sign up with your email</span>
                <form onSubmit={this.handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input name="displayName" type="text" className="form-control" id="exampleInput" 
                            value={this.state.displayName} onChange={this.handleChange} required/>
                    </div>
                    <div className="my-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={this.state.email} onChange={this.handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1"
                        value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                        <input name="confirmPassword" type="password" className="form-control" id="exampleInputConfirmPassword1"
                        value={this.state.confirmPassword} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-dark px-5 mt-3">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;