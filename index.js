import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Captcha extends Component {
  static propTypes = {
    sitekey: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    theme: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    theme: 'light',
    type: 'image'
  };

  constructor(props) {
    super(props);
    this.state = {
      scriptLoading: true,
      scriptLoadError: false
    };

    this.getScriptURL = `https://www.google.com/recaptcha/api.js?
    onload=onloadCallback&hl='${
    props.lang}'&render=explicit&rnd='${Math.random()}`;
  }

  componentDidMount() {
    const {sitekey, theme, type, callback} = this.props;

    window.onloadCallBack = () => {
      grecaptcha.render('captcha', {
        sitekey: sitekey,
        callback: callback,
        theme: theme,
        type: type
      });
    };
  }

  onScriptLoaded = () => {
    this.setState({scriptLoading: false});
  };

  onScriptError = () => {
    this.setState({scriptLoading: false, scriptLoadError: true});
  };

  render() {
    return (<div className='g-recaptcha' id='captcha'></div>);
  }
}

export default Captcha;