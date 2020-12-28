import React, { Fragment, Component } from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import instance from '../../../axios-orders';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component { // class factory
        // doesn't work because this is mounted after the error occurs
        // constructor(props) {
        //     super(props);
        //     axios.interceptors.request.use(req => {
        //         this.setState({ error: null });
        //         return req;
        //     })
        //     axios.interceptors.response.use(res => res, error => {
        //         console.log("error handler mounted")
        //         this.setState({ error: error });
        //     });
        // }

        // instead of using componentWillMount, which is being deprecated
        componentWillMount() {
            this.reqInterceptor = instance.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.respInterceptor = instance.interceptors.response.use(res => res, error => {
                console.log("error handler mounted")
                this.setState({ error: error });
            });
        }

        // would run in "return" function of useEffect() to clean up in functional components
        // prevents memory leak by having these live forever, but stops when the component that used
        // them is no longer shown
        componentWillUnmount(){
            console.log("Will unmount", this.reqInterceptor, this.respInterceptor);
            instance.interceptors.request.eject(this.reqInterceptor);
            instance.interceptors.response.eject(this.respInterceptor);
        }

        // componentDidCatch(error, info){
        //     this.setState({error: error})
        // }

        state = {
            error: null
        };

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        // without ternary, error would always show
                        show={this.state.error} // modals are always present, but not always shown
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;