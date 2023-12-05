import React, {Component} from 'react'
import {Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {userLogin} from '../actions/auth.actions'
import history from '../history'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    constructor({history, userLogin}){
        super({history,userLogin})
        this.userLogin= userLogin
        this.history = history
    }

    logInUser = (e) => {
        e.preventDefault()
        console.log("> Login.logInUser()- e:")
        this.setState({
            email: e.target.email.value,
            password: e.target.password.value
        })
        this.userLogin(this.state)
            .then(()=>{
                console.log("*** Pushing /profile to History")
                this.history.push("/profile")
            })
    }

    render() {
        return (
            <Container className="main-wrapper">
                <Row style={{marginTop: '15vh'}}>
                    <Col
                        lg={{size: 6, offset: 3}}
                        style={{
                            border: '1px solid #c9c5c2',
                            padding: 35,
                            boxShadow: '3px 3px 47px 0px rgba(0,0,0,0.5)'
                        }}
                    >
                        <Form onSubmit={(e) => {
                            console.log("FORM.onSubmit!")
                            this.logInUser(e)
                        }}>
                            <FormGroup>
                                <Label for="email-field">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email-field"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({email: e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password-field">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="pass-field"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={e => this.setState({password: e.target.value})}
                                />
                            </FormGroup>
                            {this.props.showLoginError ? (
                                <Alert color="primary">
                                    Either your email or password is incorrect. Please try again.
                                </Alert>
                            ) : null}
                            <Button className="mr-3" type="submit" color="primary">
                                Submit
                            </Button>
                            <a href="/signup">Not a member?</a>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        showLoginError: state.auth.showLoginError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLogin: bindActionCreators(userLogin, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
