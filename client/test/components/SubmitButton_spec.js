import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SubmitButton from '../../src/components/SubmitButton';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('SubmitButton', () => {
    it('show submit button', () => {
        const url = "url to login";
        const component = renderIntoDocument(
            <SubmitButton />
        );
        const button = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(button.length).to.equal(1);
    });

    it('handles submit button click event', ()=> {
        var test_value = false;
        const fake_click_function = () => test_value = true;

        const component = renderIntoDocument(
            <SubmitButton click_function={fake_click_function} />
        );
        const button = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(button[0]);
        expect(test_value).to.equal(true);
    });
});