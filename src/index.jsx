var React = require('react');
var lodashThrottle = require('lodash.throttle');

var ReactTour = React.createClass({

  propTypes: {
    config: React.PropTypes.arrayOf(React.PropTypes.shape({
      node: React.PropTypes.object,
      text: React.PropTypes.string
    })),
    currentStep: React.PropTypes.number.isRequired,
    visible: React.PropTypes.bool,
    showDots: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      visible: true,
      showDots: true
    };
  },

  componentDidMount() {
    this.throttledOnWindowResize = lodashThrottle(this.onWindowResize, 64);
    window.addEventListener('resize', this.throttledOnWindowResize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledOnWindowResize);
  },

  onWindowResize() {
    this.forceUpdate();
  },

  render() {
    var {currentStep, config, visible, showDots} = this.props;
    var ElementRect;
    var classes = 'react-tour';

    if (!config) return null;
    if (!visible) classes += ' react-tour-hide';

    ElementRect = config[currentStep] ? config[currentStep].node.getBoundingClientRect() : config[0].node.getBoundingClientRect();

    return (
      <div className={classes}>
        <div className='react-tour-focus' style={{
          top: parseInt(ElementRect.top - 20, 10),
          left: parseInt(ElementRect.left - 20, 10),
          height: parseInt(ElementRect.height + 40, 10),
          width: parseInt(ElementRect.width + 40, 10)
        }}>
          <div className='react-tour-focus-text'>
            {config[currentStep] ? config[currentStep].text : config[0].text}

            {showDots && (
              <div className='react-tour-dots'>
                {config.map((el, index) => {
                  return <div className={'react-tour-dots-single' + (currentStep >= index ? ' active' : '')} key={index} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ReactTour;
