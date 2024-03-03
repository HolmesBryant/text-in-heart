/**
 * A custom web component that displays text inside a heart shape.
 * @extends HTMLElement
 * @author Holmes Bryant <https://github.com/HolmesBryant>
 * @license GPL-3.0
 *
 * @attribute [fill] optional (default: "none") The color of the inside of the shape.
 * @attribute [stroke] optional (default: "gray") The color of the line around the shape.
 * @attribute [strokewidth] optional (default: "1px") The width of the line around the shape.
 * @attribute [inset] optional (default: "10px") The spacing between the text and the shape boundry.
 * @attribute [textcolor] optional (default: "inherit") The color of the text.
 * @attribute [text] optional (default: null) The text to place inside the shape. This is used for dynamically changing the text with javascript. For normal usage, just place the text inside the tag.

 * @usage
 * 	<script type="module" src="text-in-heart.js"></script>
 * 	<text-in-heart>a short paragraph of text</text-in-heart>
 */
class TextInHeart extends HTMLElement {
	/**
	 * The fill color of the heart shape.
	 * @private
	 * @type {string}
	 */
	#fill = 'none';

	/**
	 * The stroke color of the heart shape.
	 * @private
	 * @type {string}
	 */
	#stroke = 'gray';

	/**
	 * The width of the stroke line.
	 * @private
	 * @type {string}
	 */
	#strokewidth="1px";

	/**
	 * The inset value for the heart shape.
	 * @private
	 * @type {string}
	 */
	#inset = '10px';

	/**
	 * The color of the text.
	 * @private
	 * @type {string}
	 */
	#textcolor = 'inherit';

	/**
	 * The text content to be displayed inside the heart.
	 * @private
	 * @type {string}
	 */
	#text;
	static observedAttributes = ['fill', 'stroke', 'inset', 'textcolor', 'text'];

	/**
	 * Constructor
	 */
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML =  `
			<style>
				:host {
					aspect-ratio: 1/1;
					display: inline-block;
					width: 300px;
				}

				::slotted(*) {
					margin: 0;
					position: relative;
					text-align: center;
				}

				@supports (text-justify: inter-character) {
					::slotted(*) {
						text-align: justify;
						text-justify: inter-character;
					}
				}

				span {
					color: ${this.textcolor};
					hyphens: manual;
					overflow-wrap: anywhere;
					overflow: hidden;
					position: relative;
					text-overflow: ellipsis;
					word-break: break-all;
					z-index: 1;
				}

				path {
					fill: ${this.fill};
					stroke: ${this.stroke};
				}

				.heart {
					height: 100%;
					position: relative;
					overflow: hidden;

				}

				.heart-left {
					margin-top: 0;
					float: left;
					height: 102%;
					shape-margin: ${this.inset};
					shape-outside: polygon(100% 0%, 0% 0%, 0.52% 93.74%, 101.04% 94.26%, 86.78% 91.09%, 9.2% 53.78%, 0.43% 41.99%, 1.3% 28.99%, 16.6% 15.56%, 48.61% 7.61%, 77.26% 10.31%, 101.04% 17.79%);
					width: 50%;
				}

				.heart-right {
					float: right;
					height: 102%;
					shape-margin: ${this.inset};
					shape-outside: polygon(0% 0%, 100% 0%, 99.48% 92.43%, 0.52% 93.74%, 13.06% 90.97%, 86.86% 56.01%, 98.84% 45.4%, 99.72% 29.79%, 85.25% 15.7%, 55.92% 7.94%, 24.18% 9.62%, 1.76% 18.05%);
					width: 50%;
				}

				.heart-bg {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 0;
				}

			</style>
			<div class="heart" part="text-in-heart">
				<div class="heart-left"></div>
				<div class="heart-right"></div>
				<svg class="heart-bg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z'/>
				</svg>
				<span><slot>Need Text</slot></span>
			</div>
			`;
	}

	/**
	 * Called when element is inserted into the DOM
	 */
	connectedCallback() {
		this.fill = this.getAttribute('fill') || this.fill;
		this.stroke = this.getAttribute('stroke') || this.stroke;
		this.strokewidth = this.getAttribute('strokewidth') || this.strokewidth;
		this.inset = this.getAttribute('inset') || this.inset;
		this.textColor = this.getAttribute('textColor') || this.textColor;
	}

	/**
	 * Called when an observed attribute changes
	 * @param  {string} attr   The attribute name
	 * @param  {string} oldval The old value
	 * @param  {string} newval The new value
	 */
	attributeChangedCallback(attr, oldval, newval) {
        this[attr] = newval;
    }

	/**
	 * Get the fill property
	 * @returns {string} A color value
	 */
	get fill() { return this.#fill; }

	/**
	 * Set the fill property
	 * @param  {string} value A valid css color value;
	 */
	set fill(value) {
		if (!value) value = 'none';
		this.#fill = value;
		const el = this.shadowRoot.querySelector('svg > path');
		if (el)  el.style.fill = value;
	}

	/**
	 * Gets the stroke (color) value
	 * @returns {string} A css length value;
	 */
	get stroke() { return this.#stroke; }

	/**
	 * Sets the value of the stroke property
	 * @param  {string} value A valid css color value
	 */
	set stroke(value) {
		if (!value) value = 'rgb(100,100,100)';
		this.#stroke = value;
		const el = this.shadowRoot.querySelector('svg > path');
		if (el)  el.style.stroke = value;
	}

	/**
	 * Gets the strokeWidth value
	 * @returns {string} A css <length> value
	 */
	get strokewidth() { return this.#strokewidth; }

	/**
	 * Sets the strokeWidth value
	 * @param  {string} value A valid css <length> value
	 */
	set strokewidth(value) {
		if (!value) value = '1px';
		this.#strokewidth = value;
		const el = this.shadowRoot.querySelector('path');
		el.style.strokeWidth = value;
	}

	/**
	 * Gets the inset value
	 * @returns {string} A css <length> value
	 */
	get inset() { return this.#inset; }

	/**
	 * Sets the inset value
	 * @param  {string} value A valid css <length> value
	 */
	set inset(value) {
		if (!value) value = '10px';
		this.#inset = value;
		const elem1 = this.shadowRoot.querySelector('.heart-left');
		const elem2 = this.shadowRoot.querySelector('.heart-right');
		elem1.style.shapeMargin = elem2.style.shapeMargin = value;
	}

	/**
	 * Gets the text value
	 * @return {string} A string of text
	 */
	get text() { return this.#text; }

	set text(value) {
		if (!value) return;
		this.#text = value;
		const el = this.shadowRoot.querySelector('span');
		el.textContent = value;
	}
}

document.addEventListener('DOMContentLoaded', customElements.define('text-in-heart', TextInHeart));
