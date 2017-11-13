import * as React from 'react';
import classNames from 'classnames';

class InputField extends React.Component {

    static defaultProps = {
        type: 'text',
    };

    render() {
        return (
            <div className={this._buildClassNames()}>
                {this.props.label &&
                    <label
                        className="inputField-label"
                        htmlFor={this.props.id}
                    >
                        {this.props.label}
                    </label>
                }
                <input
                    className="inputField-input"
                    id={this.props.id}
                    name={this.props.name}
                    type={this.props.type}
                    size={this.props.size}
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChangeHandler}
                    required={this.props.isRequired}
                    step={this.props.step}
                    pattern={this.props.pattern}
                />
            </div>
        );
    }

    _buildClassNames() {
        return classNames({
            inputField: true,
            inputField_inline: this.props.isInline,
            inputField_noLabel: this.props.hideLabel,
        });
    }

}

export default InputField;
