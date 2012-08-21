/*!
 * jCarousel Control Plugin
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2012, Jan Sorgalla
 * Dual licensed under the MIT (https://github.com/jsor/jcarousel/blob/master/LICENSE-MIT)
 * or GPL Version 2 (https://github.com/jsor/jcarousel/blob/master/LICENSE-GPL) licenses.
 *
 * Depends:
 *     jquery.jcarousel.js
 */

(function ($)
{
    'use strict';
    $.jcarousel.plugin('jcarouselResponsive', 
    {
        resizeTimer:   null,
        _options: 
        {
            visible: 2
        },
        _init: function()
        {
            this.onDestroy = $.proxy(function() 
            {
                this._destroy();
                this.carousel().one('createend.jcarousel', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
        },
        _create: function()
        {
            this.carousel()
                .one('destroy.jcarousel', this.onDestroy)
                .bind('reloadend.jcarousel scrollend.jcarousel', this.onReload);
            this._resize();
        },
        _destroy: function()
        {
            this.carousel()
                .unbind('destroy.jcarousel', this.onDestroy)
                .unbind('reloadend.jcarousel scrollend.jcarousel', this.onReload);
        },
        _reload: function() 
        {
            this._resize();
        },
        _resize: function()
        {
            var items = $(this.carousel().jcarousel('items'));
            var width = 100 / items.length + '%';
            $(items).width(width);

            var clipping = this.carousel().jcarousel('clipping');
            var list = $(this.carousel().jcarousel('list'));
            $(list).width(clipping * items.length / this._options.visible);
        }
    });
}(jQuery));