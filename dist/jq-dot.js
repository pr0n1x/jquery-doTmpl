//
// jQuery plugin for doT template engine
// 2016 Maxim Makarov aka pr0n1x
// Licensed under the MIT license
//

// plugin definition like https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
		// [pr0n1x] Надо убедиться что получим действительно глобальный объект
		var _globals = (0,eval)('this');
        factory(_globals.jQuery);
    }
}(function ($) {
   var templatesCompiled = {};

	function compileTemplate(tmplId) {
		var $template = $('script#'+tmplId);
		if($template.length < 1) {
			var errStr = 'Template "'+tmplId+'" not found';
			throw (errStr);
		}
		return doT.template($template.text());
	}

	$.fn.doTmpl = function(tmplId, data) {
		var tmpl = {
				 sel: this.selector
				,id: null
				,du: null
			};
		switch(typeof(tmplId)) {
			case 'object':
				data = tmplId;
				break;
			case 'string':
				tmpl.id = tmplId;
		}
		data = data || {};

		if(typeof(templatesCompiled[tmpl.sel]) != 'undefined') {
			if(null === tmpl.id) {
				tmpl.id = templatesCompiled[tmpl.sel].id;
			}
			if(tmpl.id === templatesCompiled[tmpl.sel].id) {
				tmpl.du = templatesCompiled[tmpl.sel].du;
			}
			else {
				tmpl.du = compileTemplate(tmpl.id);
				templatesCompiled[tmpl.sel] = tmpl;
			}
		}
		else {
			if( null === tmpl.id ) {
				throw 'Template Id is empty';
			}
			tmpl.du = compileTemplate(tmpl.id);
			templatesCompiled[tmpl.sel] = tmpl;
		}

		return this.each(function() {
			var $this = $(this);
			$this.data(data);
			$this.html(tmpl.du($this.data()));
		});
	};
}));

