class TextInHeart extends HTMLElement {
	shadow = ShadowRoot;
	tmpl = DocumentFragment;
	#fill = 'none';
	#stroke = 'rgb(100,100,100)';
	#inset = '10px';
	styles;
	static observedAttributes = ['fill', 'stroke', 'inset'];
	template = `
		<style>
			:host {
				aspect-ratio: 1/1;
				display: block;
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

			.heart {
				height: 100%;
				position: relative;
			}

			.heart-left {
				float: left;
				height: 100%;
				shape-outside: polygon(100% 0%, 0% 0%, 0.52% 93.74%, 101.04% 94.26%, 86.78% 91.09%, 9.2% 53.78%, 0.43% 41.99%, 1.3% 28.99%, 16.6% 15.56%, 48.61% 7.61%, 77.26% 10.31%, 101.04% 17.79%);
				width: 50%;
			}

			.heart-right {
				float: right;
				height: 100%;
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
			<slot>Need Text</slot>
		</div>
	`;

	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'open'});
		this.tmpl = this.setTemplate();
		this.fill = this.getAttribute('fill') || this.fill;
		this.stroke = this.getAttribute('stroke') || this.stroke;
		this.inset = this.getAttribute('inset') || this.inset;
	}

	connectedCallback() {
		this.sheet = new CSSStyleSheet();
		this.build();
		this.render();
	}

	attributeChangedCallback(attr, oldval, newval) {
        this[attr] = newval;
        if (this.shadow.children.length > 0) {
	        this.build();
        }
    }

	build() {
		const variable_styles = [
			`.heart-left { shape-margin: ${this.#inset}; }`,
			`.heart-right { shape-margin: ${this.#inset}; }`,
			`path { fill: ${this.#fill}; stroke: ${this.#stroke}; }`
		];
		variable_styles.forEach( style => {
			this.sheet.insertRule(style)
		});
		this.shadow.adoptedStyleSheets = [this.sheet];
	}

	render() {
		this.shadow.append(this.tmpl);
	}

	setTemplate() {
		return document.createRange().createContextualFragment(this.template);
	}

	get fill() {
		return this.#fill;
	}

	set fill(value = String) {
		this.#fill = value;
		// const el = this.tmpl.querySelector('svg > path');
		// if (el)  el.setAttribute('fill', value);
	}

	get stroke() {
		return this.#stroke;
	}

	set stroke(value = String) {
		this.#stroke = value;
		// const el = this.tmpl.querySelector('svg > path');
		// if (el)  el.setAttribute('stroke', value);
	}

	get inset() {
		return this.#inset;
	}

	set inset(value = String) {
		this.#inset = value;
	}
}

document.addEventListener('DOMContentLoaded', customElements.define('text-in-heart', TextInHeart));
