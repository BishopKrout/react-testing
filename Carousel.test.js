import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

test('left arrow should go back to the previous image', () => {
  const photos = [
      {src: "image1.jpg", caption: "Image 1"},
      {src: "image2.jpg", caption: "Image 2"},
      {src: "image3.jpg", caption: "Image 3"},
  ];

  const { getByAltText, getByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Move to the second image using the right arrow
  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // Now click the left arrow to move back to the first image
  const leftArrow = getByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // Expect the first image to be displayed
  const displayedImage = getByAltText("Image 1");
  expect(displayedImage).toBeInTheDocument();
});

test('arrows should hide correctly based on image position', () => {
  const photos = [
      {src: "image1.jpg", caption: "Image 1"},
      {src: "image2.jpg", caption: "Image 2"},
      {src: "image3.jpg", caption: "Image 3"},
  ];

  const { getByTestId, queryByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Initially, the left arrow should not be present since we are on the first image
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  // Move to the last image using the right arrow
  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // The right arrow should not be present since we are on the last image
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});

