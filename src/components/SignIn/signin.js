import React, { Component } from 'react'
import styles from './signin.module.css'
import {firebase} from '../../firebase';

import FormField from '../widgets/FormFields/formFields';

export default class SignIn extends Component {
    state ={
        registerError: '',
        loading: false,
        //Declaring all the input of the form like EMAIL, PASSWORD...
        formdata : {
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email',
                },
                validation:{
                    required: true,
                    email:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
            },
            password: {
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter your password',
                },
                validation:{
                    required: true,
                    password:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',  
            },
        }
    }

    updateForm= (element) => {
        const newFormdata = {
            ...this.state.formdata
        }

        const newElement = {
            ...newFormdata[element.id]
        }

        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        console.log(newFormdata);
        
        this.setState({
            formdata:newFormdata
        })
    }

    validate= (element) => {
        let error= [true, ''];

        //For checking the email correction i.e: abc@abc.com 
        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value) ;
            const message = `${!valid ? 'Email should be valid' : ''}`;
            error = !valid ? [valid, message] : error
        }

        //For checking the password length... 
        if(element.validation.password){
            const valid = element.value.length >= 4;
            const message = `${!valid ? 'Your password is too short' : ''}`;
            error = !valid ? [valid, message] : error
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`;
            error = !valid ? [valid,message] : error
        }
        return error;
    }

    submitForm =(event, type) => {
        //Stoping the default behaviour of submiting form by pressing the ENTER button...
        event.preventDefault();
        if(type !== null){
            let datatoSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                datatoSubmit[key] = this.state.formdata[key].value;
            }

            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:'',
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        datatoSubmit.email,
                        datatoSubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch(error => {
                        this.setState({
                            loading:false,
                            registerError: error.message,
                        })
                    })
                }
                else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        datatoSubmit.email,
                        datatoSubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch(error => {
                        this.setState({
                            loading:false,
                            registerError: error.message,
                        })
                    })
                }
            }

        }
    }

    submitButton= () =>(
        this.state.loading?
            'loading ...'
            :
            <div>
                <button onClick={(event) => this.submitForm(event, false)}>Register Now</button>
                <button onClick={(event) => this.submitForm(event, true)}>Login</button>
            </div>
    )

    showError= () => (
        this.state.registerError !== '' ? 
            <div className={styles.error}>
                {this.state.registerError}
            </div>
        : ''
    )

    render() {
        return (
            <div className={styles.logContainer}>
                <form onSubmit={(event) => this.submitForm(event, null)}>
                    <h2>Register / Login Form</h2>
                    <FormField 
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => {this.updateForm(element)}}
                    />
                    <FormField 
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => {this.updateForm(element)}}
                    />
                    { this.submitButton() }
                    { this.showError() }
                </form>
            </div>
        )
    }
}
