# jquery-doTmpl
jQuery templating plugin powered by doT engine - fast and simple

## Installing doT plugin
```
$ bower install jquery-doTmpl
```

doTmpl of course depends on [doT.js](http://olado.github.io/doT/index.html)
```html
<script src="bower_components/doT/doT.min.js"></script>
<script src="bower_components/jquery-doTmpl/dist/jq-dot.min.js"></script>
```

## How to use

### html
```html
<!-- container with initial data values -->
<div id="cart"
     data-price_value="10"
     data-discount_value="2"
     data-discount_percent="18"
     data-price_without_discount="12"
    ></div>
<!-- be careful "data-param-name-one" attribute will be interpreted as "it.paramNameOne"
    see https://www.w3.org/TR/html5/dom.html#dom-dataset
    
    Writing a statement like: $( "body" ).data( { "my-name": "aValue" } ).data();
    will return: { myName: "aValue" }
-->

<!-- Template -->
<script type="text/plain" id="tmpl-cart">
{{? it.price_value > 0 }}
		<div class="prices">
			{{? it.discount_value > 0 }}
			  <div class="old">
				<s>Цена: {{= it.price_without_discount }}</s>
						{{? it.discount_percent > 0 }}
							<b class="discount">Your discount {{= it.discount_percent }}%</b>
						{{?}}
				</div>
			{{?}}
			<div class="current">
				{{?it.discount_value>0}}Discount price{{??}}Price{{?}}:&nbsp;
				<span class="value">{{= it.price_value_fmt }}</span>
			</div>
		</div>
		<a href="#modal-make-order" data-toggle="modal" class="btn-block btn-primary">Buy now</a>
{{??}}
	<div class="buy-block-dummy">Your basket is empty</div>
{{?}}
</script>
```

### javascript
```javascript
// usage: $('.container.selector').doTmpl('templateId', templateData);
(function($) {
    var $cartConteiner = $('#cart').doTmpl('tmpl-cart', {
        // this is initial data with higher priority than data-attributes data :)
         price_value: 8
        ,discount_value: 2
        ,discount_percent: 20
        ,price_without_discount: 10
    });
    
    // after initialization plugin cached template and no need to specify templateId
    $(body).on('click', '.add-to-cart', function() {
        //some code here ...
        
        // this call rerender template and put new content to $cartContainer
        $cartContainer.doTmpl({
            //you can update only one parameters. no need to set all variables
            price_without_discount: 30
        });
    });
})(jQuery)
```
