import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Welcome from '../src/Welcome';

describe('A suite', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<Welcome />).contains(<div className="foo">Bar</div>)).toBe(true);
    });

    it('should be selectable by class "foo"', () => {
        expect(shallow(<Welcome />).is('.foo')).toBe(true);
    });

    it('should mount in a full DOM', () => {
        expect(mount(<Welcome />).find('.foo').length).toBe(1);
    });

    it('should render to static HTML', () => {
        expect(render(<Welcome />).text()).toEqual('Bar');
    });
});

