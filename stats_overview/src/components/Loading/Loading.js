import React, { Component } from 'react';
import './Loading.css'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.modal = React.createRef();
    }

    componentDidMount() {
        this.toggleModal();
    }

    componentDidUpdate() {
        this.toggleModal();
    }

    toggleModal() {
        if (this.props.loading)
            this.showModal();
        else
            this.hideModal();
    }

    showModal() {
        this.modal.current.classList.add('show')
        this.modal.current.style.display = 'flex'
    }

    hideModal() {
        this.modal.current.classList.remove('show')
        this.modal.current.style.display = 'none'

    }

    render() {

        return (
            <div>
                <div ref={this.modal} className="modal fade modal-backdrop" tabIndex="-1" id="myModal" data-keyboard="false" data-backdrop="static">
                    <div ref={this.modal1} className="modal-dialog modal-dialog-centered justify-content-center" role="document">
                        <div ref={this.modal2} className="spinner d-flex justify-content-center">
                            <div ref={this.modal3} className="spinner-border" role="status">
                            </div>
                            <p id="spinner-message">{this.props.message}</p>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

Loading.defaultProps = {
    message: 'Loading...'
}

export default Loading;
