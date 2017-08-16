import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Home from '../../src/views/Home';

//https://medium.com/netscape/testing-a-react-redux-app-using-jest-and-enzyme-b349324803a9
// https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
describe('views/Home', () => {
    let expectedData;

    beforeEach(() => {
        expectedData = {

        };
    });

    it('should render without throwing an error', () => {
        const actual = (<Home store={expectedData} />);
        const expected = (<div className="foo">Bar</div>);

        expect(shallow(actual).contains(expected)).toBe(true);
    });

    // it('should be selectable by class "foo"', () => {
    //     expect(shallow(<Home />).is('.foo')).toBe(true);
    // });
    //
    // it('should mount in a full DOM', () => {
    //     expect(mount(<Home />).find('.foo').length).toBe(1);
    // });
    //
    // it('should render to static HTML', () => {
    //     expect(render(<Home />).text()).toEqual('Bar');
    // });
});
