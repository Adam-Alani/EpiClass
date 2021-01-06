
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* node_modules\@sveltejs\svelte-virtual-list\VirtualList.svelte generated by Svelte v3.31.1 */
    const file = "node_modules\\@sveltejs\\svelte-virtual-list\\VirtualList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i];
    	return child_ctx;
    }

    const get_default_slot_changes = dirty => ({ item: dirty & /*visible*/ 16 });
    const get_default_slot_context = ctx => ({ item: /*row*/ ctx[23].data });

    // (164:26) Missing template
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Missing template");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(164:26) Missing template",
    		ctx
    	});

    	return block;
    }

    // (162:2) {#each visible as row (row.index)}
    function create_each_block(key_1, ctx) {
    	let svelte_virtual_list_row;
    	let t;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], get_default_slot_context);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			svelte_virtual_list_row = element("svelte-virtual-list-row");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t = space();
    			set_custom_element_data(svelte_virtual_list_row, "class", "svelte-f3lx1s");
    			add_location(svelte_virtual_list_row, file, 162, 3, 3461);
    			this.first = svelte_virtual_list_row;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_virtual_list_row, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(svelte_virtual_list_row, null);
    			}

    			append_dev(svelte_virtual_list_row, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, visible*/ 8208) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[13], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_virtual_list_row);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(162:2) {#each visible as row (row.index)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let svelte_virtual_list_viewport;
    	let svelte_virtual_list_contents;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let svelte_virtual_list_viewport_resize_listener;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*visible*/ ctx[4];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*row*/ ctx[23].index;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			svelte_virtual_list_viewport = element("svelte-virtual-list-viewport");
    			svelte_virtual_list_contents = element("svelte-virtual-list-contents");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			set_style(svelte_virtual_list_contents, "padding-top", /*top*/ ctx[5] + "px");
    			set_style(svelte_virtual_list_contents, "padding-bottom", /*bottom*/ ctx[6] + "px");
    			set_custom_element_data(svelte_virtual_list_contents, "class", "svelte-f3lx1s");
    			add_location(svelte_virtual_list_contents, file, 157, 1, 3305);
    			set_style(svelte_virtual_list_viewport, "height", /*height*/ ctx[0]);
    			set_custom_element_data(svelte_virtual_list_viewport, "class", "svelte-f3lx1s");
    			add_render_callback(() => /*svelte_virtual_list_viewport_elementresize_handler*/ ctx[17].call(svelte_virtual_list_viewport));
    			add_location(svelte_virtual_list_viewport, file, 151, 0, 3159);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_virtual_list_viewport, anchor);
    			append_dev(svelte_virtual_list_viewport, svelte_virtual_list_contents);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(svelte_virtual_list_contents, null);
    			}

    			/*svelte_virtual_list_contents_binding*/ ctx[15](svelte_virtual_list_contents);
    			/*svelte_virtual_list_viewport_binding*/ ctx[16](svelte_virtual_list_viewport);
    			svelte_virtual_list_viewport_resize_listener = add_resize_listener(svelte_virtual_list_viewport, /*svelte_virtual_list_viewport_elementresize_handler*/ ctx[17].bind(svelte_virtual_list_viewport));
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(svelte_virtual_list_viewport, "scroll", /*handle_scroll*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$$scope, visible*/ 8208) {
    				each_value = /*visible*/ ctx[4];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, svelte_virtual_list_contents, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if (!current || dirty & /*top*/ 32) {
    				set_style(svelte_virtual_list_contents, "padding-top", /*top*/ ctx[5] + "px");
    			}

    			if (!current || dirty & /*bottom*/ 64) {
    				set_style(svelte_virtual_list_contents, "padding-bottom", /*bottom*/ ctx[6] + "px");
    			}

    			if (!current || dirty & /*height*/ 1) {
    				set_style(svelte_virtual_list_viewport, "height", /*height*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_virtual_list_viewport);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			/*svelte_virtual_list_contents_binding*/ ctx[15](null);
    			/*svelte_virtual_list_viewport_binding*/ ctx[16](null);
    			svelte_virtual_list_viewport_resize_listener();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("VirtualList", slots, ['default']);
    	let { items } = $$props;
    	let { height = "100%" } = $$props;
    	let { itemHeight = undefined } = $$props;
    	let foo;
    	let { start = 0 } = $$props;
    	let { end = 0 } = $$props;

    	// local state
    	let height_map = [];

    	let rows;
    	let viewport;
    	let contents;
    	let viewport_height = 0;
    	let visible;
    	let mounted;
    	let top = 0;
    	let bottom = 0;
    	let average_height;

    	async function refresh(items, viewport_height, itemHeight) {
    		const { scrollTop } = viewport;
    		await tick(); // wait until the DOM is up to date
    		let content_height = top - scrollTop;
    		let i = start;

    		while (content_height < viewport_height && i < items.length) {
    			let row = rows[i - start];

    			if (!row) {
    				$$invalidate(9, end = i + 1);
    				await tick(); // render the newly visible row
    				row = rows[i - start];
    			}

    			const row_height = height_map[i] = itemHeight || row.offsetHeight;
    			content_height += row_height;
    			i += 1;
    		}

    		$$invalidate(9, end = i);
    		const remaining = items.length - end;
    		average_height = (top + content_height) / end;
    		$$invalidate(6, bottom = remaining * average_height);
    		height_map.length = items.length;
    	}

    	async function handle_scroll() {
    		const { scrollTop } = viewport;
    		const old_start = start;

    		for (let v = 0; v < rows.length; v += 1) {
    			height_map[start + v] = itemHeight || rows[v].offsetHeight;
    		}

    		let i = 0;
    		let y = 0;

    		while (i < items.length) {
    			const row_height = height_map[i] || average_height;

    			if (y + row_height > scrollTop) {
    				$$invalidate(8, start = i);
    				$$invalidate(5, top = y);
    				break;
    			}

    			y += row_height;
    			i += 1;
    		}

    		while (i < items.length) {
    			y += height_map[i] || average_height;
    			i += 1;
    			if (y > scrollTop + viewport_height) break;
    		}

    		$$invalidate(9, end = i);
    		const remaining = items.length - end;
    		average_height = y / end;
    		while (i < items.length) height_map[i++] = average_height;
    		$$invalidate(6, bottom = remaining * average_height);

    		// prevent jumping if we scrolled up into unknown territory
    		if (start < old_start) {
    			await tick();
    			let expected_height = 0;
    			let actual_height = 0;

    			for (let i = start; i < old_start; i += 1) {
    				if (rows[i - start]) {
    					expected_height += height_map[i];
    					actual_height += itemHeight || rows[i - start].offsetHeight;
    				}
    			}

    			const d = actual_height - expected_height;
    			viewport.scrollTo(0, scrollTop + d);
    		}
    	} // TODO if we overestimated the space these
    	// rows would occupy we may need to add some

    	// more. maybe we can just call handle_scroll again?
    	// trigger initial refresh
    	onMount(() => {
    		rows = contents.getElementsByTagName("svelte-virtual-list-row");
    		$$invalidate(12, mounted = true);
    	});

    	const writable_props = ["items", "height", "itemHeight", "start", "end"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<VirtualList> was created with unknown prop '${key}'`);
    	});

    	function svelte_virtual_list_contents_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			contents = $$value;
    			$$invalidate(3, contents);
    		});
    	}

    	function svelte_virtual_list_viewport_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			viewport = $$value;
    			$$invalidate(2, viewport);
    		});
    	}

    	function svelte_virtual_list_viewport_elementresize_handler() {
    		viewport_height = this.offsetHeight;
    		$$invalidate(1, viewport_height);
    	}

    	$$self.$$set = $$props => {
    		if ("items" in $$props) $$invalidate(10, items = $$props.items);
    		if ("height" in $$props) $$invalidate(0, height = $$props.height);
    		if ("itemHeight" in $$props) $$invalidate(11, itemHeight = $$props.itemHeight);
    		if ("start" in $$props) $$invalidate(8, start = $$props.start);
    		if ("end" in $$props) $$invalidate(9, end = $$props.end);
    		if ("$$scope" in $$props) $$invalidate(13, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		tick,
    		items,
    		height,
    		itemHeight,
    		foo,
    		start,
    		end,
    		height_map,
    		rows,
    		viewport,
    		contents,
    		viewport_height,
    		visible,
    		mounted,
    		top,
    		bottom,
    		average_height,
    		refresh,
    		handle_scroll
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(10, items = $$props.items);
    		if ("height" in $$props) $$invalidate(0, height = $$props.height);
    		if ("itemHeight" in $$props) $$invalidate(11, itemHeight = $$props.itemHeight);
    		if ("foo" in $$props) foo = $$props.foo;
    		if ("start" in $$props) $$invalidate(8, start = $$props.start);
    		if ("end" in $$props) $$invalidate(9, end = $$props.end);
    		if ("height_map" in $$props) height_map = $$props.height_map;
    		if ("rows" in $$props) rows = $$props.rows;
    		if ("viewport" in $$props) $$invalidate(2, viewport = $$props.viewport);
    		if ("contents" in $$props) $$invalidate(3, contents = $$props.contents);
    		if ("viewport_height" in $$props) $$invalidate(1, viewport_height = $$props.viewport_height);
    		if ("visible" in $$props) $$invalidate(4, visible = $$props.visible);
    		if ("mounted" in $$props) $$invalidate(12, mounted = $$props.mounted);
    		if ("top" in $$props) $$invalidate(5, top = $$props.top);
    		if ("bottom" in $$props) $$invalidate(6, bottom = $$props.bottom);
    		if ("average_height" in $$props) average_height = $$props.average_height;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*items, start, end*/ 1792) {
    			 $$invalidate(4, visible = items.slice(start, end).map((data, i) => {
    				return { index: i + start, data };
    			}));
    		}

    		if ($$self.$$.dirty & /*mounted, items, viewport_height, itemHeight*/ 7170) {
    			// whenever `items` changes, invalidate the current heightmap
    			 if (mounted) refresh(items, viewport_height, itemHeight);
    		}
    	};

    	return [
    		height,
    		viewport_height,
    		viewport,
    		contents,
    		visible,
    		top,
    		bottom,
    		handle_scroll,
    		start,
    		end,
    		items,
    		itemHeight,
    		mounted,
    		$$scope,
    		slots,
    		svelte_virtual_list_contents_binding,
    		svelte_virtual_list_viewport_binding,
    		svelte_virtual_list_viewport_elementresize_handler
    	];
    }

    class VirtualList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			items: 10,
    			height: 0,
    			itemHeight: 11,
    			start: 8,
    			end: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VirtualList",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*items*/ ctx[10] === undefined && !("items" in props)) {
    			console.warn("<VirtualList> was created without expected prop 'items'");
    		}
    	}

    	get items() {
    		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get itemHeight() {
    		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set itemHeight(value) {
    		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get start() {
    		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set start(value) {
    		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get end() {
    		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set end(value) {
    		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\FilterSearch.svelte generated by Svelte v3.31.1 */
    const file$1 = "src\\components\\FilterSearch.svelte";

    // (45:8) <VirtualList items={filteredList}  bind:start={start} bind:end={end}  let:item>
    function create_default_slot(ctx) {
    	let a;
    	let t0_value = /*item*/ ctx[8].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*item*/ ctx[8].number + "";
    	let t2;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = text("-");
    			t2 = text(t2_value);
    			attr_dev(a, "href", "#");
    			attr_dev(a, "class", "truncate leading-loose outline-none hover:text-gray-200 svelte-1kqw151");
    			add_location(a, file$1, 45, 12, 1883);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(a, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 256 && t0_value !== (t0_value = /*item*/ ctx[8].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*item*/ 256 && t2_value !== (t2_value = /*item*/ ctx[8].number + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(45:8) <VirtualList items={filteredList}  bind:start={start} bind:end={end}  let:item>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div0;
    	let svg;
    	let path;
    	let t0;
    	let input;
    	let t1;
    	let div1;
    	let virtuallist;
    	let updating_start;
    	let updating_end;
    	let current;
    	let mounted;
    	let dispose;

    	function virtuallist_start_binding(value) {
    		/*virtuallist_start_binding*/ ctx[5].call(null, value);
    	}

    	function virtuallist_end_binding(value) {
    		/*virtuallist_end_binding*/ ctx[6].call(null, value);
    	}

    	let virtuallist_props = {
    		items: /*filteredList*/ ctx[3],
    		$$slots: {
    			default: [
    				create_default_slot,
    				({ item }) => ({ 8: item }),
    				({ item }) => item ? 256 : 0
    			]
    		},
    		$$scope: { ctx }
    	};

    	if (/*start*/ ctx[1] !== void 0) {
    		virtuallist_props.start = /*start*/ ctx[1];
    	}

    	if (/*end*/ ctx[2] !== void 0) {
    		virtuallist_props.end = /*end*/ ctx[2];
    	}

    	virtuallist = new VirtualList({ props: virtuallist_props, $$inline: true });
    	binding_callbacks.push(() => bind(virtuallist, "start", virtuallist_start_binding));
    	binding_callbacks.push(() => bind(virtuallist, "end", virtuallist_end_binding));

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			div1 = element("div");
    			create_component(virtuallist.$$.fragment);
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "2");
    			attr_dev(path, "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z");
    			attr_dev(path, "class", "svelte-1kqw151");
    			add_location(path, file$1, 40, 144, 1419);
    			attr_dev(svg, "class", "gray-text  svelte-1kqw151");
    			attr_dev(svg, "width", "18");
    			attr_dev(svg, "height", "18");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$1, 40, 8, 1283);
    			attr_dev(input, "placeholder", "Enter Your Class");
    			attr_dev(input, "class", "ml-2 gray-text font-semibold border-b-2 border-gray-400 focus:outline-none w-40  svelte-1kqw151");
    			add_location(input, file$1, 41, 8, 1554);
    			attr_dev(div0, "class", "h-16 flex flex-none items-center px-4 bg-white  svelte-1kqw151");
    			add_location(div0, file$1, 39, 4, 1212);
    			attr_dev(div1, "class", "text-center font-semibold overflow-y-auto svelte-1kqw151");
    			add_location(div1, file$1, 43, 4, 1725);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, svg);
    			append_dev(svg, path);
    			append_dev(div0, t0);
    			append_dev(div0, input);
    			set_input_value(input, /*searchTerm*/ ctx[0]);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(virtuallist, div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*searchTerm*/ 1 && input.value !== /*searchTerm*/ ctx[0]) {
    				set_input_value(input, /*searchTerm*/ ctx[0]);
    			}

    			const virtuallist_changes = {};
    			if (dirty & /*filteredList*/ 8) virtuallist_changes.items = /*filteredList*/ ctx[3];

    			if (dirty & /*$$scope, item*/ 768) {
    				virtuallist_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_start && dirty & /*start*/ 2) {
    				updating_start = true;
    				virtuallist_changes.start = /*start*/ ctx[1];
    				add_flush_callback(() => updating_start = false);
    			}

    			if (!updating_end && dirty & /*end*/ 4) {
    				updating_end = true;
    				virtuallist_changes.end = /*end*/ ctx[2];
    				add_flush_callback(() => updating_end = false);
    			}

    			virtuallist.$set(virtuallist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(virtuallist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(virtuallist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(virtuallist);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let filteredList;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("FilterSearch", slots, []);
    	let start = 0;
    	let end = 60;
    	let searchTerm = "";

    	let classes = [
    		{ name: "S1-A1", number: 1 },
    		{ name: "S1-A1", number: 2 },
    		{ name: "S1-A2", number: 1 },
    		{ name: "S1-A2", number: 2 },
    		{ name: "S1-B1", number: 1 },
    		{ name: "S1-B1", number: 2 },
    		{ name: "S1-B2", number: 1 },
    		{ name: "S1-B2", number: 2 },
    		{ name: "S1-C1", number: 1 },
    		{ name: "S1-C1", number: 2 },
    		{ name: "S1-C2", number: 1 },
    		{ name: "S1-C2", number: 2 },
    		{ name: "S1-D1", number: 1 },
    		{ name: "S1-D1", number: 2 },
    		{ name: "S1-D2", number: 1 },
    		{ name: "S1-D2", number: 2 },
    		{ name: "S3-A1", number: 1 },
    		{ name: "S3-A1", number: 2 },
    		{ name: "S3-A2", number: 1 },
    		{ name: "S3-A2", number: 2 },
    		{ name: "S3-B1", number: 1 },
    		{ name: "S3-B1", number: 2 },
    		{ name: "S3-B2", number: 1 },
    		{ name: "S3-B2", number: 2 }
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FilterSearch> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		searchTerm = this.value;
    		$$invalidate(0, searchTerm);
    	}

    	function virtuallist_start_binding(value) {
    		start = value;
    		$$invalidate(1, start);
    	}

    	function virtuallist_end_binding(value) {
    		end = value;
    		$$invalidate(2, end);
    	}

    	$$self.$capture_state = () => ({
    		VirtualList,
    		start,
    		end,
    		searchTerm,
    		classes,
    		filteredList
    	});

    	$$self.$inject_state = $$props => {
    		if ("start" in $$props) $$invalidate(1, start = $$props.start);
    		if ("end" in $$props) $$invalidate(2, end = $$props.end);
    		if ("searchTerm" in $$props) $$invalidate(0, searchTerm = $$props.searchTerm);
    		if ("classes" in $$props) $$invalidate(7, classes = $$props.classes);
    		if ("filteredList" in $$props) $$invalidate(3, filteredList = $$props.filteredList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*searchTerm*/ 1) {
    			 $$invalidate(3, filteredList = classes.filter(item => item.name.indexOf(searchTerm) !== -1));
    		}
    	};

    	return [
    		searchTerm,
    		start,
    		end,
    		filteredList,
    		input_input_handler,
    		virtuallist_start_binding,
    		virtuallist_end_binding
    	];
    }

    class FilterSearch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FilterSearch",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    let currDay = writable(0);
    let currDayStr = writable((new Date()).getDay());
    let weekDays = writable(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

    /* src\components\Calendar.svelte generated by Svelte v3.31.1 */

    const { Object: Object_1, console: console_1 } = globals;

    function create_fragment$2(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function emptyClass(currentTime, prevTime) {
    	return parseInt(currentTime.split("T")[1].split(":")[0]) > 1 + parseInt(prevTime.split("T")[1].split(":")[0]);
    }

    function fixTime(date) {
    	return date.split("T")[1].slice(0, -4);
    }

    function generateBoard(board, m, n) {
    	for (let i = 0; i < n; ++i) {
    		board[i] = [];

    		for (let j = 0; j < m; ++j) {
    			board[i][j] = 0;
    		}
    	}

    	return board;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $currDay;
    	let $currDayStr;
    	validate_store(currDay, "currDay");
    	component_subscribe($$self, currDay, $$value => $$invalidate(8, $currDay = $$value));
    	validate_store(currDayStr, "currDayStr");
    	component_subscribe($$self, currDayStr, $$value => $$invalidate(9, $currDayStr = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Calendar", slots, []);
    	let data;
    	let listData = [];
    	let tempCourses = [];
    	let allCourses = [];

    	onMount(async () => {
    		data = await fetch("http://localhost:8090/1").then(x => x.json());
    		listData = Object.values(data);
    		console.log(listData[0].length);

    		for (let i = 0; i < listData[0].length; i++) {
    			let courseList = Object.values(listData[0][i].courses);

    			for (let j = 0; j < courseList.length; j++) {
    				let course = Object.values(courseList[j]);
    				tempCourses.push(course);
    				tempCourses = tempCourses;
    			}
    		}

    		console.log(tempCourses);
    		allCourses.push(tempCourses[0]);
    		allCourses = allCourses;

    		for (let i = 1; i < tempCourses.length; i++) {
    			if (emptyClass(tempCourses[i][1], tempCourses[i - 1][1])) {
    				let date = new Date(tempCourses[i - 1][1]);
    				date.setHours(date.getHours() + 1);
    				allCourses.push([" ", date]);
    				allCourses = allCourses;
    			}

    			allCourses.push(tempCourses[i]);
    			allCourses = allCourses;
    		}

    		console.log(allCourses);
    	});

    	function increaseDay(sign) {
    		console.log($currDay);

    		if ($currDay !== 0 || sign === false) {
    			if (sign) {
    				checkWeekend($currDayStr, true);
    				currDay.update(n => n - 1);
    				currDayStr.update(n => n - 1);
    			} else {
    				checkWeekend($currDayStr, false);
    				currDay.update(n => n + 1);
    				currDayStr.update(n => n + 1);
    			}
    		}
    	}

    	function checkWeekend(day, sign) {
    		if (sign) {
    			if (day === 1) {
    				console.log("HEY");
    				currDayStr.update(n => 6);
    			}
    		} else if (day + 1 === 6) {
    			currDayStr.update(n => 0);
    		}
    	}

    	let board = [[]];
    	board = generateBoard(board, 7, 13);
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Calendar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		currDay,
    		currDayStr,
    		weekDays,
    		data,
    		listData,
    		tempCourses,
    		allCourses,
    		emptyClass,
    		fixTime,
    		increaseDay,
    		checkWeekend,
    		board,
    		generateBoard,
    		$currDay,
    		$currDayStr
    	});

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) data = $$props.data;
    		if ("listData" in $$props) listData = $$props.listData;
    		if ("tempCourses" in $$props) tempCourses = $$props.tempCourses;
    		if ("allCourses" in $$props) allCourses = $$props.allCourses;
    		if ("board" in $$props) board = $$props.board;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [fixTime, increaseDay, checkWeekend];
    }

    class Calendar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			fixTime: 0,
    			increaseDay: 1,
    			checkWeekend: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Calendar",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get fixTime() {
    		return fixTime;
    	}

    	set fixTime(value) {
    		throw new Error("<Calendar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get increaseDay() {
    		return this.$$.ctx[1];
    	}

    	set increaseDay(value) {
    		throw new Error("<Calendar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checkWeekend() {
    		return this.$$.ctx[2];
    	}

    	set checkWeekend(value) {
    		throw new Error("<Calendar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Schedule.svelte generated by Svelte v3.31.1 */

    const { Object: Object_1$1, console: console_1$1 } = globals;
    const file$2 = "src\\components\\Schedule.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (101:20) {:else}
    function create_else_block(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 103, 32, 5561);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 102, 28, 5484);
    			attr_dev(div1, "class", "flex flex-1 bg-red-300 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 101, 24, 5362);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(101:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (95:61) 
    function create_if_block_5(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 97, 32, 5172);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 96, 28, 5095);
    			attr_dev(div1, "class", "flex flex-1 bg-yellow-200 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 95, 24, 4970);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(95:61) ",
    		ctx
    	});

    	return block;
    }

    // (89:62) 
    function create_if_block_4(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 91, 32, 4746);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 90, 28, 4669);
    			attr_dev(div1, "class", "flex flex-1 bg-indigo-300 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 89, 24, 4544);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(89:62) ",
    		ctx
    	});

    	return block;
    }

    // (83:63) 
    function create_if_block_3(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 85, 32, 4319);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 84, 28, 4242);
    			attr_dev(div1, "class", "flex flex-1 bg-blue-400 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 83, 24, 4119);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(83:63) ",
    		ctx
    	});

    	return block;
    }

    // (77:62) 
    function create_if_block_2(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 79, 32, 3893);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 78, 28, 3816);
    			attr_dev(div1, "class", "flex flex-1 bg-green-300 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 77, 24, 3692);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(77:62) ",
    		ctx
    	});

    	return block;
    }

    // (71:62) 
    function create_if_block_1(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 73, 32, 3467);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 72, 28, 3390);
    			attr_dev(div1, "class", "flex flex-1 bg-pink-300 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 71, 24, 3267);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(71:62) ",
    		ctx
    	});

    	return block;
    }

    // (65:20) {#if (courses.name).includes("Math")}
    function create_if_block(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "";
    	let t0;
    	let t1;
    	let t2_value = /*courses*/ ctx[13].name.trim() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(p, "class", "svelte-1kqw151");
    			add_location(p, file$2, 67, 32, 3042);
    			attr_dev(div0, "class", "flex items-center text-center svelte-1kqw151");
    			add_location(div0, file$2, 66, 28, 2965);
    			attr_dev(div1, "class", "flex flex-1 bg-purple-400 rounded-lg items-center justify-center my-1 mx-4 shadow svelte-1kqw151");
    			add_location(div1, file$2, 65, 24, 2840);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay*/ 12 && t0_value !== (t0_value = fixTime$1(/*courses*/ ctx[13].start_date).trim() + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*listData, $currDay*/ 12 && t2_value !== (t2_value = /*courses*/ ctx[13].name.trim() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(65:20) {#if (courses.name).includes(\\\"Math\\\")}",
    		ctx
    	});

    	return block;
    }

    // (64:16) {#each listD[$currDay].courses as courses}
    function create_each_block_1(ctx) {
    	let show_if;
    	let show_if_1;
    	let show_if_2;
    	let show_if_3;
    	let show_if_4;
    	let show_if_5;
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (show_if == null || dirty & /*listData, $currDay*/ 12) show_if = !!/*courses*/ ctx[13].name.includes("Math");
    		if (show_if) return create_if_block;
    		if (show_if_1 == null || dirty & /*listData, $currDay*/ 12) show_if_1 = !!/*courses*/ ctx[13].name.includes("Phys");
    		if (show_if_1) return create_if_block_1;
    		if (show_if_2 == null || dirty & /*listData, $currDay*/ 12) show_if_2 = !!/*courses*/ ctx[13].name.includes("Algo");
    		if (show_if_2) return create_if_block_2;
    		if (show_if_3 == null || dirty & /*listData, $currDay*/ 12) show_if_3 = !!/*courses*/ ctx[13].name.includes("Archi");
    		if (show_if_3) return create_if_block_3;
    		if (show_if_4 == null || dirty & /*listData, $currDay*/ 12) show_if_4 = !!/*courses*/ ctx[13].name.includes("Elec");
    		if (show_if_4) return create_if_block_4;
    		if (show_if_5 == null || dirty & /*listData, $currDay*/ 12) show_if_5 = !!/*courses*/ ctx[13].name.includes("CIE");
    		if (show_if_5) return create_if_block_5;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx, -1);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(64:16) {#each listD[$currDay].courses as courses}",
    		ctx
    	});

    	return block;
    }

    // (63:8) {#each listData as listD}
    function create_each_block$1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*listD*/ ctx[10][/*$currDay*/ ctx[3]].courses;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*listData, $currDay, fixTime*/ 13) {
    				each_value_1 = /*listD*/ ctx[10][/*$currDay*/ ctx[3]].courses;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(63:8) {#each listData as listD}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div2;
    	let div0;
    	let a0;
    	let svg0;
    	let path0;
    	let t0;
    	let h1;
    	let strong;
    	let t1_value = /*$weekDays*/ ctx[5][/*$currDayStr*/ ctx[4]] + "";
    	let t1;
    	let t2;
    	let a1;
    	let svg1;
    	let path1;
    	let t3;
    	let div1;
    	let mounted;
    	let dispose;
    	let each_value = /*listData*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			h1 = element("h1");
    			strong = element("strong");
    			t1 = text(t1_value);
    			t2 = space();
    			a1 = element("a");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t3 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(path0, "fill-rule", "evenodd");
    			attr_dev(path0, "d", "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z");
    			attr_dev(path0, "class", "svelte-1kqw151");
    			add_location(path0, file$2, 54, 147, 1651);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "24");
    			attr_dev(svg0, "height", "24");
    			attr_dev(svg0, "fill", "currentColor");
    			attr_dev(svg0, "class", "bi bi-arrow-left-square svelte-1kqw151");
    			attr_dev(svg0, "viewBox", "0 0 16 16");
    			add_location(svg0, file$2, 54, 12, 1516);
    			attr_dev(a0, "role", "button");
    			attr_dev(a0, "class", "rounded-full border-transparent hover:bg-green-300 dgray-text   svelte-1kqw151");
    			add_location(a0, file$2, 53, 8, 1376);
    			attr_dev(strong, "class", "svelte-1kqw151");
    			add_location(strong, file$2, 56, 68, 1966);
    			attr_dev(h1, "class", "flex-none px-4 py-4 custom-h text-xl dgray-text svelte-1kqw151");
    			add_location(h1, file$2, 56, 8, 1906);
    			attr_dev(path1, "fill-rule", "evenodd");
    			attr_dev(path1, "d", "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z");
    			attr_dev(path1, "class", "svelte-1kqw151");
    			add_location(path1, file$2, 58, 148, 2299);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "24");
    			attr_dev(svg1, "height", "24");
    			attr_dev(svg1, "fill", "currentColor");
    			attr_dev(svg1, "class", "bi bi-arrow-right-circle svelte-1kqw151");
    			attr_dev(svg1, "viewBox", "0 0 16 16");
    			add_location(svg1, file$2, 58, 12, 2163);
    			attr_dev(a1, "role", "button");
    			attr_dev(a1, "class", "rounded-full border-transparent hover:bg-green-300 dgray-text   svelte-1kqw151");
    			add_location(a1, file$2, 57, 8, 2022);
    			attr_dev(div0, "class", "h-16 hidden mx-2 lg:flex justify-center  text-center items-center svelte-1kqw151");
    			add_location(div0, file$2, 52, 4, 1287);
    			attr_dev(div1, "class", "gray-text my-2 flex flex-col flex-grow justify-around hidden lg:flex font-semibold  svelte-1kqw151");
    			add_location(div1, file$2, 61, 4, 2563);
    			attr_dev(div2, "class", "w-96 flex-col gray-text bg-gray-200 hidden lg:flex   svelte-1kqw151");
    			add_location(div2, file$2, 50, 0, 1213);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, a0);
    			append_dev(a0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div0, t0);
    			append_dev(div0, h1);
    			append_dev(h1, strong);
    			append_dev(strong, t1);
    			append_dev(div0, t2);
    			append_dev(div0, a1);
    			append_dev(a1, svg1);
    			append_dev(svg1, path1);
    			append_dev(div2, t3);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*click_handler*/ ctx[7], false, false, false),
    					listen_dev(a1, "click", /*click_handler_1*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$weekDays, $currDayStr*/ 48 && t1_value !== (t1_value = /*$weekDays*/ ctx[5][/*$currDayStr*/ ctx[4]] + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*listData, $currDay, fixTime*/ 13) {
    				each_value = /*listData*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function fixTime$1(date) {
    	return date.split("T")[1].slice(0, -4);
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $currDay;
    	let $currDayStr;
    	let $weekDays;
    	validate_store(currDay, "currDay");
    	component_subscribe($$self, currDay, $$value => $$invalidate(3, $currDay = $$value));
    	validate_store(currDayStr, "currDayStr");
    	component_subscribe($$self, currDayStr, $$value => $$invalidate(4, $currDayStr = $$value));
    	validate_store(weekDays, "weekDays");
    	component_subscribe($$self, weekDays, $$value => $$invalidate(5, $weekDays = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Schedule", slots, []);
    	let data;
    	let listData = [];

    	onMount(async () => {
    		data = await fetch("http://localhost:8090/1").then(x => x.json());
    		$$invalidate(2, listData = Object.values(data));
    	});

    	function increaseDay(sign) {
    		console.log($currDay);

    		if ($currDay !== 0 || sign === false) {
    			if (sign) {
    				checkWeekend($currDayStr, true);
    				currDay.update(n => n - 1);
    				currDayStr.update(n => n - 1);
    			} else {
    				checkWeekend($currDayStr, false);
    				currDay.update(n => n + 1);
    				currDayStr.update(n => n + 1);
    			}
    		}
    	}

    	function checkWeekend(day, sign) {
    		if (sign) {
    			if (day === 1) {
    				console.log("HEY");
    				currDayStr.update(n => 6);
    			}
    		} else if (day + 1 === 6) {
    			currDayStr.update(n => 0);
    		}
    	}

    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<Schedule> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		increaseDay(true);
    	};

    	const click_handler_1 = () => {
    		increaseDay(false);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		currDay,
    		currDayStr,
    		weekDays,
    		data,
    		listData,
    		fixTime: fixTime$1,
    		increaseDay,
    		checkWeekend,
    		$currDay,
    		$currDayStr,
    		$weekDays
    	});

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) data = $$props.data;
    		if ("listData" in $$props) $$invalidate(2, listData = $$props.listData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		fixTime$1,
    		increaseDay,
    		listData,
    		$currDay,
    		$currDayStr,
    		$weekDays,
    		checkWeekend,
    		click_handler,
    		click_handler_1
    	];
    }

    class Schedule extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			fixTime: 0,
    			increaseDay: 1,
    			checkWeekend: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Schedule",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get fixTime() {
    		return fixTime$1;
    	}

    	set fixTime(value) {
    		throw new Error("<Schedule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get increaseDay() {
    		return this.$$.ctx[1];
    	}

    	set increaseDay(value) {
    		throw new Error("<Schedule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checkWeekend() {
    		return this.$$.ctx[6];
    	}

    	set checkWeekend(value) {
    		throw new Error("<Schedule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.31.1 */
    const file$3 = "src\\App.svelte";

    function create_fragment$4(ctx) {
    	let main;
    	let div8;
    	let div7;
    	let div1;
    	let filtersearch;
    	let t0;
    	let div0;
    	let a0;
    	let t2;
    	let div6;
    	let div4;
    	let div3;
    	let div2;
    	let a1;
    	let svg0;
    	let path0;
    	let t3;
    	let h1;
    	let strong;
    	let t5;
    	let t6;
    	let a2;
    	let svg1;
    	let path1;
    	let t7;
    	let span;
    	let t9;
    	let div5;
    	let calender;
    	let t10;
    	let schedule;
    	let current;
    	filtersearch = new FilterSearch({ $$inline: true });
    	calender = new Calendar({ $$inline: true });
    	schedule = new Schedule({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div8 = element("div");
    			div7 = element("div");
    			div1 = element("div");
    			create_component(filtersearch.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "Made with ❤ by Adam";
    			t2 = space();
    			div6 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			a1 = element("a");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t3 = space();
    			h1 = element("h1");
    			strong = element("strong");
    			strong.textContent = "January,";
    			t5 = text(" 2021");
    			t6 = space();
    			a2 = element("a");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t7 = space();
    			span = element("span");
    			span.textContent = "Class Name";
    			t9 = space();
    			div5 = element("div");
    			create_component(calender.$$.fragment);
    			t10 = space();
    			create_component(schedule.$$.fragment);
    			attr_dev(a0, "href", "https://www.github.com/Adam-Alani");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "ml-10 text-xs");
    			add_location(a0, file$3, 15, 20, 577);
    			attr_dev(div0, "class", " h-8 flex flex-none items-center bg-white gray-text shadow-lg");
    			add_location(div0, file$3, 14, 16, 481);
    			attr_dev(div1, "class", "sidebar flex-none justify-between flex flex-col text-white bg-gradient-to-r from-green-300 to-green-400 ");
    			add_location(div1, file$3, 12, 12, 314);
    			attr_dev(path0, "fill-rule", "evenodd");
    			attr_dev(path0, "d", "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z");
    			add_location(path0, file$3, 23, 167, 1267);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "24");
    			attr_dev(svg0, "height", "24");
    			attr_dev(svg0, "fill", "currentColor");
    			attr_dev(svg0, "class", "bi bi-arrow-left-square");
    			attr_dev(svg0, "viewBox", "0 0 16 16");
    			add_location(svg0, file$3, 23, 32, 1132);
    			attr_dev(a1, "role", "button");
    			attr_dev(a1, "class", " rounded-full border-transparent hover:bg-green-300 dgray-text  ");
    			add_location(a1, file$3, 22, 28, 1009);
    			add_location(strong, file$3, 25, 75, 1607);
    			attr_dev(h1, "class", "ml-2 flex-none custom-h text-xl dgray-text");
    			add_location(h1, file$3, 25, 20, 1552);
    			attr_dev(path1, "fill-rule", "evenodd");
    			attr_dev(path1, "d", "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z");
    			add_location(path1, file$3, 27, 168, 1934);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "24");
    			attr_dev(svg1, "height", "24");
    			attr_dev(svg1, "fill", "currentColor");
    			attr_dev(svg1, "class", "bi bi-arrow-right-circle");
    			attr_dev(svg1, "viewBox", "0 0 16 16");
    			add_location(svg1, file$3, 27, 32, 1798);
    			attr_dev(a2, "role", "button");
    			attr_dev(a2, "class", "ml-2 rounded-full border-transparent hover:bg-green-300 dgray-text  ");
    			add_location(a2, file$3, 26, 28, 1671);
    			attr_dev(div2, "class", "flex px-4 py-4  items-center text-center justify-center");
    			add_location(div2, file$3, 21, 24, 911);
    			attr_dev(span, "class", " px-4 py-4 custom-h text-lg dgray-text");
    			attr_dev(span, "font-semibold", "float:right;");
    			add_location(span, file$3, 30, 20, 2251);
    			attr_dev(div3, "class", "flex justify-between");
    			add_location(div3, file$3, 20, 20, 852);
    			attr_dev(div4, "class", "h-16");
    			add_location(div4, file$3, 19, 16, 813);
    			attr_dev(div5, "class", "flex-1 flex flex-col overflow-y-auto");
    			add_location(div5, file$3, 35, 16, 2464);
    			attr_dev(div6, "class", "flex flex-col gray-text bg-gray-100 flex-grow");
    			add_location(div6, file$3, 18, 12, 737);
    			attr_dev(div7, "class", "flex flex-1 overflow-y-hidden ");
    			add_location(div7, file$3, 10, 8, 256);
    			attr_dev(div8, "class", "flex flex-col h-screen ");
    			add_location(div8, file$3, 9, 4, 210);
    			add_location(main, file$3, 8, 0, 199);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div1);
    			mount_component(filtersearch, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(div7, t2);
    			append_dev(div7, div6);
    			append_dev(div6, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, a1);
    			append_dev(a1, svg0);
    			append_dev(svg0, path0);
    			append_dev(div2, t3);
    			append_dev(div2, h1);
    			append_dev(h1, strong);
    			append_dev(h1, t5);
    			append_dev(div2, t6);
    			append_dev(div2, a2);
    			append_dev(a2, svg1);
    			append_dev(svg1, path1);
    			append_dev(div3, t7);
    			append_dev(div3, span);
    			append_dev(div6, t9);
    			append_dev(div6, div5);
    			mount_component(calender, div5, null);
    			append_dev(div7, t10);
    			mount_component(schedule, div7, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(filtersearch.$$.fragment, local);
    			transition_in(calender.$$.fragment, local);
    			transition_in(schedule.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(filtersearch.$$.fragment, local);
    			transition_out(calender.$$.fragment, local);
    			transition_out(schedule.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(filtersearch);
    			destroy_component(calender);
    			destroy_component(schedule);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ FilterSearch, Calender: Calendar, Schedule });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
