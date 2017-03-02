import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CommentList from '../../src/components/CommentList';
import {expect} from 'chai';
import {fromJS} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('CommentList', () => {
    it('show comment list without comments', () => {
        const comments = [];
        const component = renderIntoDocument(
            <CommentList comments={comments} />
        );
        const p = scryRenderedDOMComponentsWithTag(component, 'p');
        expect(p[0].textContent).to.equal('no comments at all');
    });

    it('show comment list with comments', () => {
       const comments = fromJS([{id: 1, user: {login: 'jerry', avatar_url: 'some url'}, body: '123'}]);
       const component = renderIntoDocument(
           <CommentList comments={comments} />
       );
       const ul = scryRenderedDOMComponentsWithTag(component, 'ul');
       //console.log(ul[0].innerHTML);
       expect(ul.length).to.equal(1);
    });
});