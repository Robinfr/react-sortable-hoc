import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { SortableContainer, SortableElement, arrayMove } from './src/index';
import range from 'lodash/range';
import random from 'lodash/random';

const SortableItem = SortableElement(({ value }) => (
    <li className="SortableItem">{value}</li>
));

const SortableList = SortableContainer(({ items }) => (
    <ul className="SortableList">
        {items.map((value, index) =>
            <SortableItem key={`item-${index}`} index={index} value={value} />
        )}
    </ul>
));

const NestedSortableList = ({ items }) => {
    const i = Array.apply(null, Array(10)).map((val, index) => 'Item ' + index);

    return (
        <ul className="SortableList">
            {items.map((value, index) =>
                <SortableList distance={10} key={`item-${index}`} index={index} value={value} items={i} />
            )}
        </ul>
    );
};

class Example extends Component {
    state = {
        items: range(100).map((value) => {
            return {
                value,
                height: random(49, 120)
            };
        })
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        let { items } = this.state;

        this.setState({
            items: arrayMove(items, oldIndex, newIndex)
        });
    };

    render() {
        return (
            <NestedSortableList distance={10} items={this.state.items} onSortEnd={this.onSortEnd.bind(this)}
                                helperClass="SortableHelper" />
        );
    }
}

render(<Example />,
    document.getElementById('root')
);
