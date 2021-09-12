import { SvelteComponent, init, safe_not_equal, element, attr, insert, space, set_style, append, set_input_value, listen, text, toggle_class, set_data, svg_element, detach, run_all, destroy_each, noop } from 'svelte/internal';
import { createEventDispatcher } from 'svelte';

/* src\RichSelect.svelte generated by Svelte v3.42.5 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[21] = list[i];
	child_ctx[23] = i;
	return child_ctx;
}

// (88:10) {:else}
function create_else_block(ctx) {
	let t;

	return {
		c() {
			t = text(/*placeholder*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 4) set_data(t, /*placeholder*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (86:10) {#if !hideValue}
function create_if_block_3(ctx) {
	let span;

	let t_value = (/*value*/ ctx[0]
	? /*value*/ ctx[0].valueOf
	: /*placeholder*/ ctx[2]) + "";

	let t;

	return {
		c() {
			span = element("span");
			t = text(t_value);
			attr(span, "class", "block truncate ");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*value, placeholder*/ 5 && t_value !== (t_value = (/*value*/ ctx[0]
			? /*value*/ ctx[0].valueOf
			: /*placeholder*/ ctx[2]) + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (102:2) {#if show}
function create_if_block(ctx) {
	let div;
	let if_block = /*list_*/ ctx[3] && create_if_block_1(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			attr(div, "class", "absolute w-full z-10 -mt-1 border-b border-l border-r rounded-b shadow-sm bg-white border-gray-300 opacity-100 transition ease-in duration-75");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (/*list_*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

// (104:10) {#if list_}
function create_if_block_1(ctx) {
	let div;
	let input;
	let t;
	let ul;
	let mounted;
	let dispose;
	let each_value = /*list_*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");
			input = element("input");
			t = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			input.autofocus = true;
			attr(input, "placeholder", "Search");
			attr(input, "class", "inline-block w-full px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300");
			attr(div, "class", "inline-block w-full p-2 placeholder-gray-400");
			attr(ul, "class", "overflow-auto ");
			set_style(ul, "max-height", "300px");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			set_input_value(input, /*search*/ ctx[7]);
			insert(target, t, anchor);
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			input.focus();

			if (!mounted) {
				dispose = [
					listen(input, "keyup", /*keyup_handler*/ ctx[14]),
					listen(input, "input", /*input_input_handler*/ ctx[15]),
					listen(input, "click", /*click_handler_1*/ ctx[16])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*search*/ 128 && input.value !== /*search*/ ctx[7]) {
				set_input_value(input, /*search*/ ctx[7]);
			}

			if (dirty & /*valueIndex, selectedIndex, selected_, list_*/ 1112) {
				each_value = /*list_*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching) detach(t);
			if (detaching) detach(ul);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (114:30) {#if valueIndex===i}
function create_if_block_2(ctx) {
	let svg;
	let polygon;

	return {
		c() {
			svg = svg_element("svg");
			polygon = svg_element("polygon");
			attr(polygon, "points", "0 11 2 9 7 14 18 3 20 5 7 18");
			attr(svg, "fill", "currentColor");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "class", "fill-current h-4 w-4 ");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, polygon);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (110:18) {#each list_ as item, i}
function create_each_block(ctx) {
	let li;
	let div;
	let span;
	let t0_value = /*item*/ ctx[21].valueOf + "";
	let t0;
	let t1;
	let div_id_value;
	let t2;
	let mounted;
	let dispose;
	let if_block = /*valueIndex*/ ctx[6] === /*i*/ ctx[23] && create_if_block_2();

	function mousemove_handler() {
		return /*mousemove_handler*/ ctx[18](/*i*/ ctx[23]);
	}

	return {
		c() {
			li = element("li");
			div = element("div");
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			attr(span, "class", "truncate block");
			attr(div, "id", div_id_value = "bt" + /*i*/ ctx[23]);
			attr(div, "class", "flex justify-between items-center px-3 py-2 ");
			toggle_class(div, "bg-blue-600", /*valueIndex*/ ctx[6] == /*i*/ ctx[23]);
			toggle_class(div, "text-white", /*valueIndex*/ ctx[6] == /*i*/ ctx[23]);
			toggle_class(div, "bg-blue-200", /*i*/ ctx[23] == /*selectedIndex*/ ctx[4]);
			attr(li, "data-type", "option");
			attr(li, "class", "cursor-pointer font-semibold bg-gray-100 ");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, div);
			append(div, span);
			append(span, t0);
			append(div, t1);
			if (if_block) if_block.m(div, null);
			append(li, t2);

			if (!mounted) {
				dispose = [
					listen(div, "click", /*click_handler_2*/ ctx[17]),
					listen(div, "mousemove", mousemove_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*list_*/ 8 && t0_value !== (t0_value = /*item*/ ctx[21].valueOf + "")) set_data(t0, t0_value);

			if (/*valueIndex*/ ctx[6] === /*i*/ ctx[23]) {
				if (if_block) ; else {
					if_block = create_if_block_2();
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*valueIndex*/ 64) {
				toggle_class(div, "bg-blue-600", /*valueIndex*/ ctx[6] == /*i*/ ctx[23]);
			}

			if (dirty & /*valueIndex*/ 64) {
				toggle_class(div, "text-white", /*valueIndex*/ ctx[6] == /*i*/ ctx[23]);
			}

			if (dirty & /*selectedIndex*/ 16) {
				toggle_class(div, "bg-blue-200", /*i*/ ctx[23] == /*selectedIndex*/ ctx[4]);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let div0;
	let button;
	let t0;
	let svg;
	let path;
	let t1;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (!/*hideValue*/ ctx[1]) return create_if_block_3;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*show*/ ctx[5] && create_if_block(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			button = element("button");
			if_block0.c();
			t0 = space();
			svg = svg_element("svg");
			path = svg_element("path");
			t1 = space();
			if (if_block1) if_block1.c();
			attr(path, "clip-rule", "evenodd");
			attr(path, "fill-rule", "evenodd");
			attr(path, "d", "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z");
			attr(svg, "fill", "currentColor");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "class", "fill-current flex-shrink-0 ml-1 h-4 w-4 text-gray-600");
			attr(button, "type", "button");
			attr(button, "class", "w-full flex text-left justify-between items-center px-3 py-2 text-black transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white border-gray-300");
			button.value = /*value*/ ctx[0];
			attr(div0, "class", "inline-block relative w-full ");
			attr(div1, "class", "relative ");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, button);
			if_block0.m(button, null);
			append(button, t0);
			append(button, svg);
			append(svg, path);
			append(div1, t1);
			if (if_block1) if_block1.m(div1, null);

			if (!mounted) {
				dispose = [
					listen(window, "keydown", /*handleKeydown*/ ctx[11]),
					listen(button, "click", /*click_handler*/ ctx[13])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(button, t0);
				}
			}

			if (dirty & /*value*/ 1) {
				button.value = /*value*/ ctx[0];
			}

			if (/*show*/ ctx[5]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { list } = $$props;
	let list_;
	let selectedIndex = 0;
	let show = false;
	let { value } = $$props;
	let { hideValue = false } = $$props;
	let valueIndex;
	let { placeholder = "Pick an option" } = $$props;
	const dispatch = createEventDispatcher();

	const open = () => {
		$$invalidate(5, show = !show);
		$$invalidate(4, selectedIndex = 0);
	};

	let search;

	const search_ = () => {
		if (search?.length > 0) {
			let i = 0;

			$$invalidate(3, list_ = [
				...list_.filter(f => f.search.includes(search.toUpperCase())).map(f => {
					return { i: i++, ...f };
				})
			]);
		} else {
			refreshList();
		}
	};

	const selected_ = () => {
		$$invalidate(0, value = list_.find(f => f.i == selectedIndex));
		$$invalidate(5, show = false);
		$$invalidate(6, valueIndex = selectedIndex);
		dispatch("change");
	};

	function handleKeydown(event) {
		let keyCode = event.keyCode;

		if (show) switch (keyCode) {
			case 38:
				if (selectedIndex > 0) {
					$$invalidate(4, selectedIndex--, selectedIndex);
				}
				break;
			case 40:
				if (selectedIndex < list_.length - 1) {
					$$invalidate(4, selectedIndex++, selectedIndex);
				}
				break;
			case 13:
				selected_();
				break;
			case 27:
				$$invalidate(5, show = false);
				break;
		}

		console.log(selectedIndex);
	}

	const refreshList = () => {
		let i = 0;

		$$invalidate(3, list_ = [
			...list.map(f => {
				return { i: i++, ...f };
			})
		]);
	};

	const click_handler = () => open();
	const keyup_handler = () => search_();

	function input_input_handler() {
		search = this.value;
		$$invalidate(7, search);
	}

	const click_handler_1 = () => search_();
	const click_handler_2 = () => selected_();
	const mousemove_handler = i => $$invalidate(4, selectedIndex = i);

	$$self.$$set = $$props => {
		if ('list' in $$props) $$invalidate(12, list = $$props.list);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('hideValue' in $$props) $$invalidate(1, hideValue = $$props.hideValue);
		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*list*/ 4096) {
			if (list) {
				refreshList();
			}
		}
	};

	return [
		value,
		hideValue,
		placeholder,
		list_,
		selectedIndex,
		show,
		valueIndex,
		search,
		open,
		search_,
		selected_,
		handleKeydown,
		list,
		click_handler,
		keyup_handler,
		input_input_handler,
		click_handler_1,
		click_handler_2,
		mousemove_handler
	];
}

class RichSelect extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			list: 12,
			value: 0,
			hideValue: 1,
			placeholder: 2
		});
	}
}

export { RichSelect as default };
