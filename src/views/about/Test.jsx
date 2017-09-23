/* @flow */
import * as React from 'react';

type Props = {
    label: string
}

class Test extends React.Component<Props> {

    test() {
        this.foo('2', 3);
    }

    foo(x: string, y: number): number {
        return x.length * y;
    }

    render() {
        return (
            <div className="header clearfix">
                {this.props.label}
            </div>
        );
    }

}

export default Test;
