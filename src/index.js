var React = require('react');
var PropTypes = require('prop-types');

class Captcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoading: true,
      scriptLoadError: false
    };

    this.getScriptURL = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&hl='+ props.lang +'&render=explicit&rnd='+Math.random();
  }

  componentDidMount() {
    const sitekey = this.props.sitekey;
    const theme = this.props.theme;
    const type = this.props.type;
    const callback = this.props.callback;

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
    return React.createElement('div', {className: 'g-recaptcha', id: 'captcha'}, "Save")
  }
}
PropTypes.propTypes = {
  sitekey: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  theme: PropTypes.string,
  type: PropTypes.string
};

PropTypes.defaultProps = {
  theme: 'light',
  type: 'image'
};

export default Captcha;