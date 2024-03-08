# Text In Heart Web Component

Renders text inside a heart.

Demo: (https://holmesbryant.github.io/text-in-heart/)

## Attributes
* [fill] optional (default: "none") The color inside of the shape.
* [stroke] optional (default: "gray") The color of the line around the shape.
* [strokewidth] optional (default: "1px") The width of the line around the shape.
* [inset] optional (default: "10px") The spacing between the text and the shape boundry.
* [textcolor] optional (default: "inherit") The color of the text.
* [text] optional (default: null) The text to place inside the shape. This is used for dynamically changing the text with javascript. For normal usage, just place the text inside the tag.

## Usage

	<script type="module" src="text-in-heart.js"></script>
	<text-in-heart>A short paragraph of text</text-in-heart>
