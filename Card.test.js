import React from 'react';
import { render } from "@testing-library/react";
import Card from './Card';
import { act } from 'react-dom/test-utils';

it("renders without crashing", function() {
    render(<Card />);
});

it("matches snapshot", function() {
    const { asFragment } = render(
      <Card 
        caption="Test Caption"
        src="test-image.jpg"
        currNum={1}
        totalNum={5}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  