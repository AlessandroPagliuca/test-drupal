/* @license GNU-GPL-2.0-or-later https://git.drupalcode.org/project/once/-/raw/v1.0.1/LICENSE.md */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

;
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function(){const settingsElement=document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');window.drupalSettings={};if(settingsElement!==null)window.drupalSettings=JSON.parse(settingsElement.textContent);})();;
window.Drupal={behaviors:{},locale:{}};(function(Drupal,drupalSettings,drupalTranslations,console,Proxy,Reflect){Drupal.throwError=function(error){setTimeout(()=>{throw error;},0);};Drupal.attachBehaviors=function(context,settings){context=context||document;settings=settings||drupalSettings;const behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach((i)=>{if(typeof behaviors[i].attach==='function')try{behaviors[i].attach(context,settings);}catch(e){Drupal.throwError(e);}});};Drupal.detachBehaviors=function(context,settings,trigger){context=context||document;settings=settings||drupalSettings;trigger=trigger||'unload';const behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach((i)=>{if(typeof behaviors[i].detach==='function')try{behaviors[i].detach(context,settings,trigger);}catch(e){Drupal.throwError(e);}});};Drupal.checkPlain=function(str){str=str.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');return str;};Drupal.formatString=function(str,args){const processedArgs={};Object.keys(args||{}).forEach((key)=>{switch(key.charAt(0)){case '@':processedArgs[key]=Drupal.checkPlain(args[key]);break;case '!':processedArgs[key]=args[key];break;default:processedArgs[key]=Drupal.theme('placeholder',args[key]);break;}});return Drupal.stringReplace(str,processedArgs,null);};Drupal.stringReplace=function(str,args,keys){if(str.length===0)return str;if(!Array.isArray(keys)){keys=Object.keys(args||{});keys.sort((a,b)=>a.length-b.length);}if(keys.length===0)return str;const key=keys.pop();const fragments=str.split(key);if(keys.length){for(let i=0;i<fragments.length;i++)fragments[i]=Drupal.stringReplace(fragments[i],args,keys.slice(0));}return fragments.join(args[key]);};Drupal.t=function(str,args,options){options=options||{};options.context=options.context||'';if(typeof drupalTranslations!=='undefined'&&drupalTranslations.strings&&drupalTranslations.strings[options.context]&&drupalTranslations.strings[options.context][str])str=drupalTranslations.strings[options.context][str];if(args)str=Drupal.formatString(str,args);return str;};Drupal.url=function(path){return drupalSettings.path.baseUrl+drupalSettings.path.pathPrefix+path;};Drupal.url.toAbsolute=function(url){const urlParsingNode=document.createElement('a');try{url=decodeURIComponent(url);}catch(e){}urlParsingNode.setAttribute('href',url);return urlParsingNode.cloneNode(false).href;};Drupal.url.isLocal=function(url){let absoluteUrl=Drupal.url.toAbsolute(url);let {protocol}=window.location;if(protocol==='http:'&&absoluteUrl.indexOf('https:')===0)protocol='https:';let baseUrl=`${protocol}//${window.location.host}${drupalSettings.path.baseUrl.slice(0,-1)}`;try{absoluteUrl=decodeURIComponent(absoluteUrl);}catch(e){}try{baseUrl=decodeURIComponent(baseUrl);}catch(e){}return absoluteUrl===baseUrl||absoluteUrl.indexOf(`${baseUrl}/`)===0;};Drupal.formatPlural=function(count,singular,plural,args,options){args=args||{};args['@count']=count;const pluralDelimiter=drupalSettings.pluralDelimiter;const translations=Drupal.t(singular+pluralDelimiter+plural,args,options).split(pluralDelimiter);let index=0;if(typeof drupalTranslations!=='undefined'&&drupalTranslations.pluralFormula)index=count in drupalTranslations.pluralFormula?drupalTranslations.pluralFormula[count]:drupalTranslations.pluralFormula.default;else{if(args['@count']!==1)index=1;}return translations[index];};Drupal.encodePath=function(item){return window.encodeURIComponent(item).replace(/%2F/g,'/');};Drupal.deprecationError=({message})=>{if(drupalSettings.suppressDeprecationErrors===false&&typeof console!=='undefined'&&console.warn)console.warn(`[Deprecation] ${message}`);};Drupal.deprecatedProperty=({target,deprecatedProperty,message})=>{if(!Proxy||!Reflect)return target;return new Proxy(target,{get:(target,key,...rest)=>{if(key===deprecatedProperty)Drupal.deprecationError({message});return Reflect.get(target,key,...rest);}});};Drupal.theme=function(func,...args){if(func in Drupal.theme)return Drupal.theme[func](...args);};Drupal.theme.placeholder=function(str){return `<em class="placeholder">${Drupal.checkPlain(str)}</em>`;};Drupal.elementIsVisible=function(elem){return !!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};Drupal.elementIsHidden=function(elem){return !Drupal.elementIsVisible(elem);};})(Drupal,window.drupalSettings,window.drupalTranslations,window.console,window.Proxy,window.Reflect);;
if(window.jQuery)jQuery.noConflict();document.documentElement.className+=' js';(function(Drupal,drupalSettings){const domReady=(callback)=>{const listener=()=>{callback();document.removeEventListener('DOMContentLoaded',listener);};if(document.readyState!=='loading')setTimeout(callback,0);else document.addEventListener('DOMContentLoaded',listener);};domReady(()=>{Drupal.attachBehaviors(document,drupalSettings);});})(Drupal,window.drupalSettings);;
/* @license MIT https://raw.githubusercontent.com/focus-trap/tabbable/v6.2.0/LICENSE */
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):(t="undefined"!=typeof globalThis?globalThis:t||self,function(){var n=t.tabbable,o=t.tabbable={};e(o),o.noConflict=function(){return t.tabbable=n,o}}())}(this,(function(t){"use strict";var e=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],n=e.join(","),o="undefined"==typeof Element,r=o?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,i=!o&&Element.prototype.getRootNode?function(t){var e;return null==t||null===(e=t.getRootNode)||void 0===e?void 0:e.call(t)}:function(t){return null==t?void 0:t.ownerDocument},a=function t(e,n){var o;void 0===n&&(n=!0);var r=null==e||null===(o=e.getAttribute)||void 0===o?void 0:o.call(e,"inert");return""===r||"true"===r||n&&e&&t(e.parentNode)},l=function(t,e,o){if(a(t))return[];var i=Array.prototype.slice.apply(t.querySelectorAll(n));return e&&r.call(t,n)&&i.unshift(t),i=i.filter(o)},u=function t(e,o,i){for(var l=[],u=Array.from(e);u.length;){var d=u.shift();if(!a(d,!1))if("SLOT"===d.tagName){var c=d.assignedElements(),f=t(c.length?c:d.children,!0,i);i.flatten?l.push.apply(l,f):l.push({scopeParent:d,candidates:f})}else{r.call(d,n)&&i.filter(d)&&(o||!e.includes(d))&&l.push(d);var s=d.shadowRoot||"function"==typeof i.getShadowRoot&&i.getShadowRoot(d),p=!a(s,!1)&&(!i.shadowRootFilter||i.shadowRootFilter(d));if(s&&p){var h=t(!0===s?d.children:s.children,!0,i);i.flatten?l.push.apply(l,h):l.push({scopeParent:d,candidates:h})}else u.unshift.apply(u,d.children)}}return l},d=function(t){return!isNaN(parseInt(t.getAttribute("tabindex"),10))},c=function(t){if(!t)throw new Error("No node provided");return t.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||function(t){var e,n=null==t||null===(e=t.getAttribute)||void 0===e?void 0:e.call(t,"contenteditable");return""===n||"true"===n}(t))&&!d(t)?0:t.tabIndex},f=function(t,e){return t.tabIndex===e.tabIndex?t.documentOrder-e.documentOrder:t.tabIndex-e.tabIndex},s=function(t){return"INPUT"===t.tagName},p=function(t){return function(t){return s(t)&&"radio"===t.type}(t)&&!function(t){if(!t.name)return!0;var e,n=t.form||i(t),o=function(t){return n.querySelectorAll('input[type="radio"][name="'+t+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)e=o(window.CSS.escape(t.name));else try{e=o(t.name)}catch(t){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",t.message),!1}var r=function(t,e){for(var n=0;n<t.length;n++)if(t[n].checked&&t[n].form===e)return t[n]}(e,t.form);return!r||r===t}(t)},h=function(t){var e=t.getBoundingClientRect(),n=e.width,o=e.height;return 0===n&&0===o},v=function(t,e){var n=e.displayCheck,o=e.getShadowRoot;if("hidden"===getComputedStyle(t).visibility)return!0;var a=r.call(t,"details>summary:first-of-type")?t.parentElement:t;if(r.call(a,"details:not([open]) *"))return!0;if(n&&"full"!==n&&"legacy-full"!==n){if("non-zero-area"===n)return h(t)}else{if("function"==typeof o){for(var l=t;t;){var u=t.parentElement,d=i(t);if(u&&!u.shadowRoot&&!0===o(u))return h(t);t=t.assignedSlot?t.assignedSlot:u||d===t.ownerDocument?u:d.host}t=l}if(function(t){var e,n,o,r,a=t&&i(t),l=null===(e=a)||void 0===e?void 0:e.host,u=!1;if(a&&a!==t)for(u=!!(null!==(n=l)&&void 0!==n&&null!==(o=n.ownerDocument)&&void 0!==o&&o.contains(l)||null!=t&&null!==(r=t.ownerDocument)&&void 0!==r&&r.contains(t));!u&&l;){var d,c,f;u=!(null===(c=l=null===(d=a=i(l))||void 0===d?void 0:d.host)||void 0===c||null===(f=c.ownerDocument)||void 0===f||!f.contains(l))}return u}(t))return!t.getClientRects().length;if("legacy-full"!==n)return!0}return!1},b=function(t,e){return!(e.disabled||a(e)||function(t){return s(t)&&"hidden"===t.type}(e)||v(e,t)||function(t){return"DETAILS"===t.tagName&&Array.prototype.slice.apply(t.children).some((function(t){return"SUMMARY"===t.tagName}))}(e)||function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var e=t.parentElement;e;){if("FIELDSET"===e.tagName&&e.disabled){for(var n=0;n<e.children.length;n++){var o=e.children.item(n);if("LEGEND"===o.tagName)return!!r.call(e,"fieldset[disabled] *")||!o.contains(t)}return!0}e=e.parentElement}return!1}(e))},m=function(t,e){return!(p(e)||c(e)<0||!b(t,e))},g=function(t){var e=parseInt(t.getAttribute("tabindex"),10);return!!(isNaN(e)||e>=0)},y=function t(e){var n=[],o=[];return e.forEach((function(e,r){var i=!!e.scopeParent,a=i?e.scopeParent:e,l=function(t,e){var n=c(t);return n<0&&e&&!d(t)?0:n}(a,i),u=i?t(e.candidates):a;0===l?i?n.push.apply(n,u):n.push(a):o.push({documentOrder:r,tabIndex:l,item:e,isScope:i,content:u})})),o.sort(f).reduce((function(t,e){return e.isScope?t.push.apply(t,e.content):t.push(e.content),t}),[]).concat(n)},w=e.concat("iframe").join(",");t.focusable=function(t,e){return(e=e||{}).getShadowRoot?u([t],e.includeContainer,{filter:b.bind(null,e),flatten:!0,getShadowRoot:e.getShadowRoot}):l(t,e.includeContainer,b.bind(null,e))},t.getTabIndex=c,t.isFocusable=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return!1!==r.call(t,w)&&b(e,t)},t.isTabbable=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return!1!==r.call(t,n)&&m(e,t)},t.tabbable=function(t,e){var n;return n=(e=e||{}).getShadowRoot?u([t],e.includeContainer,{filter:m.bind(null,e),flatten:!1,getShadowRoot:e.getShadowRoot,shadowRootFilter:g}):l(t,e.includeContainer,m.bind(null,e)),y(n)},Object.defineProperty(t,"__esModule",{value:!0})}));

;
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
((Drupal)=>{Drupal.olivero={};function isDesktopNav(){const navButtons=document.querySelector('[data-drupal-selector="mobile-buttons"]');return navButtons?window.getComputedStyle(navButtons).getPropertyValue('display')==='none':false;}Drupal.olivero.isDesktopNav=isDesktopNav;const stickyHeaderToggleButton=document.querySelector('[data-drupal-selector="sticky-header-toggle"]');const siteHeaderFixable=document.querySelector('[data-drupal-selector="site-header-fixable"]');function stickyHeaderIsEnabled(){return stickyHeaderToggleButton.getAttribute('aria-checked')==='true';}function setStickyHeaderStorage(expandedState){const now=new Date();const item={value:expandedState,expiry:now.getTime()+20160000};localStorage.setItem('Drupal.olivero.stickyHeaderState',JSON.stringify(item));}function toggleStickyHeaderState(pinnedState){if(isDesktopNav()){siteHeaderFixable.classList.toggle('is-expanded',pinnedState);stickyHeaderToggleButton.setAttribute('aria-checked',pinnedState);setStickyHeaderStorage(pinnedState);}}function getStickyHeaderStorage(){const stickyHeaderState=localStorage.getItem('Drupal.olivero.stickyHeaderState');if(!stickyHeaderState)return false;const item=JSON.parse(stickyHeaderState);const now=new Date();if(now.getTime()>item.expiry){localStorage.removeItem('Drupal.olivero.stickyHeaderState');return false;}return item.value;}if('IntersectionObserver' in window&&'IntersectionObserverEntry' in window&&'intersectionRatio' in window.IntersectionObserverEntry.prototype){const fixableElements=document.querySelectorAll('[data-drupal-selector="site-header-fixable"], [data-drupal-selector="social-bar-inner"]');function toggleDesktopNavVisibility(entries){if(!isDesktopNav())return;entries.forEach((entry)=>{fixableElements.forEach((el)=>el.classList.toggle('is-fixed',entry.intersectionRatio<1));});}function getRootMargin(){let rootMarginTop=72;const {body}=document;if(body.classList.contains('toolbar-fixed'))rootMarginTop-=39;if(body.classList.contains('toolbar-horizontal')&&body.classList.contains('toolbar-tray-open'))rootMarginTop-=40;return `${rootMarginTop}px 0px 0px 0px`;}function monitorNavPosition(){const primaryNav=document.querySelector('[data-drupal-selector="site-header"]');const options={rootMargin:getRootMargin(),threshold:[0.999,1]};const observer=new IntersectionObserver(toggleDesktopNavVisibility,options);if(primaryNav)observer.observe(primaryNav);}if(stickyHeaderToggleButton)stickyHeaderToggleButton.addEventListener('click',()=>{toggleStickyHeaderState(!stickyHeaderIsEnabled());});const siteHeaderInner=document.querySelector('[data-drupal-selector="site-header-inner"]');if(siteHeaderInner)siteHeaderInner.addEventListener('focusin',()=>{if(isDesktopNav()&&!stickyHeaderIsEnabled()){const header=document.querySelector('[data-drupal-selector="site-header"]');const headerNav=header.querySelector('[data-drupal-selector="header-nav"]');const headerMargin=header.clientHeight-headerNav.clientHeight;if(window.scrollY>headerMargin)window.scrollTo(0,headerMargin);}});monitorNavPosition();setStickyHeaderStorage(getStickyHeaderStorage());toggleStickyHeaderState(getStickyHeaderStorage());}})(Drupal);;
((Drupal)=>{Drupal.theme.checkbox=()=>'<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox"/>';})(Drupal);;
((Drupal,once,tabbable)=>{function isNavOpen(navWrapper){return navWrapper.classList.contains('is-active');}function toggleNav(props,state){const value=!!state;props.navButton.setAttribute('aria-expanded',value);props.body.classList.toggle('is-overlay-active',value);props.body.classList.toggle('is-fixed',value);props.navWrapper.classList.toggle('is-active',value);}function init(props){props.navButton.setAttribute('aria-controls',props.navWrapperId);props.navButton.setAttribute('aria-expanded','false');props.navButton.addEventListener('click',()=>{toggleNav(props,!isNavOpen(props.navWrapper));});document.addEventListener('keyup',(e)=>{if(e.key==='Escape')if(props.olivero.areAnySubNavsOpen())props.olivero.closeAllSubNav();else toggleNav(props,false);});props.overlay.addEventListener('click',()=>{toggleNav(props,false);});props.overlay.addEventListener('touchstart',()=>{toggleNav(props,false);});props.header.addEventListener('keydown',(e)=>{if(e.key==='Tab'&&isNavOpen(props.navWrapper)){const tabbableNavElements=tabbable.tabbable(props.navWrapper);tabbableNavElements.unshift(props.navButton);const firstTabbableEl=tabbableNavElements[0];const lastTabbableEl=tabbableNavElements[tabbableNavElements.length-1];if(e.shiftKey){if(document.activeElement===firstTabbableEl&&!props.olivero.isDesktopNav()){lastTabbableEl.focus();e.preventDefault();}}else{if(document.activeElement===lastTabbableEl&&!props.olivero.isDesktopNav()){firstTabbableEl.focus();e.preventDefault();}}}});window.addEventListener('resize',()=>{if(props.olivero.isDesktopNav()){toggleNav(props,false);props.body.classList.remove('is-overlay-active');props.body.classList.remove('is-fixed');}Drupal.olivero.closeAllSubNav();});props.navWrapper.addEventListener('click',(e)=>{if(e.target.matches(`[href*="${window.location.pathname}#"], [href*="${window.location.pathname}#"] *, [href^="#"], [href^="#"] *`))toggleNav(props,false);});}Drupal.behaviors.oliveroNavigation={attach(context){const headerId='header';const header=once('navigation',`#${headerId}`,context).shift();const navWrapperId='header-nav';if(header){const navWrapper=header.querySelector(`#${navWrapperId}`);const {olivero}=Drupal;const navButton=context.querySelector('[data-drupal-selector="mobile-nav-button"]');const body=document.body;const overlay=context.querySelector('[data-drupal-selector="header-nav-overlay"]');init({olivero,header,navWrapperId,navWrapper,navButton,body,overlay});}}};})(Drupal,once,tabbable);;
((Drupal)=>{const {isDesktopNav}=Drupal.olivero;const secondLevelNavMenus=document.querySelectorAll('[data-drupal-selector="primary-nav-menu-item-has-children"]');function toggleSubNav(topLevelMenuItem,toState){const buttonSelector='[data-drupal-selector="primary-nav-submenu-toggle-button"]';const button=topLevelMenuItem.querySelector(buttonSelector);const state=toState!==undefined?toState:button.getAttribute('aria-expanded')!=='true';if(state){if(isDesktopNav())secondLevelNavMenus.forEach((el)=>{el.querySelector(buttonSelector).setAttribute('aria-expanded','false');el.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.remove('is-active-menu-parent');el.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.remove('is-active-menu-parent');});}else topLevelMenuItem.classList.remove('is-touch-event');button.setAttribute('aria-expanded',state);topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.toggle('is-active-menu-parent',state);topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.toggle('is-active-menu-parent',state);}Drupal.olivero.toggleSubNav=toggleSubNav;function handleBlur(e){if(!Drupal.olivero.isDesktopNav())return;setTimeout(()=>{const menuParentItem=e.target.closest('[data-drupal-selector="primary-nav-menu-item-has-children"]');if(!menuParentItem.contains(document.activeElement))toggleSubNav(menuParentItem,false);},200);}secondLevelNavMenus.forEach((el)=>{const button=el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');button.removeAttribute('aria-hidden');button.removeAttribute('tabindex');el.addEventListener('touchstart',()=>{el.classList.add('is-touch-event');},{passive:true});el.addEventListener('mouseover',()=>{if(isDesktopNav()&&!el.classList.contains('is-touch-event')){el.classList.add('is-active-mouseover-event');toggleSubNav(el,true);setTimeout(()=>{el.classList.remove('is-active-mouseover-event');},500);}});button.addEventListener('click',()=>{if(!el.classList.contains('is-active-mouseover-event'))toggleSubNav(el);});el.addEventListener('mouseout',()=>{if(isDesktopNav()&&!document.activeElement.matches('[aria-expanded="true"], .is-active-menu-parent *'))toggleSubNav(el,false);});el.addEventListener('blur',handleBlur,true);});function closeAllSubNav(){secondLevelNavMenus.forEach((el)=>{if(el.contains(document.activeElement))el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]').focus();toggleSubNav(el,false);});}Drupal.olivero.closeAllSubNav=closeAllSubNav;function areAnySubNavsOpen(){let subNavsAreOpen=false;secondLevelNavMenus.forEach((el)=>{const button=el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');const state=button.getAttribute('aria-expanded')==='true';if(state)subNavsAreOpen=true;});return subNavsAreOpen;}Drupal.olivero.areAnySubNavsOpen=areAnySubNavsOpen;document.addEventListener('keyup',(e)=>{if(e.key==='Escape')if(isDesktopNav())closeAllSubNav();});document.addEventListener('touchstart',(e)=>{if(areAnySubNavsOpen()&&!e.target.matches('[data-drupal-selector="header-nav"], [data-drupal-selector="header-nav"] *'))closeAllSubNav();},{passive:true});})(Drupal);;
((Drupal,once)=>{function transitionToDesktopNavigation(navWrapper,navItem){document.body.classList.remove('is-always-mobile-nav');if(navWrapper.clientHeight>navItem.clientHeight)document.body.classList.add('is-always-mobile-nav');}function checkIfDesktopNavigationWraps(entries){const navItem=document.querySelector('.primary-nav__menu-item');if(Drupal.olivero.isDesktopNav()&&entries[0].contentRect.height>navItem.clientHeight){const navMediaQuery=window.matchMedia(`(max-width: ${window.innerWidth+15}px)`);document.body.classList.add('is-always-mobile-nav');navMediaQuery.addEventListener('change',()=>{transitionToDesktopNavigation(entries[0].target,navItem);},{once:true});}}function init(primaryNav){const resizeObserver=new ResizeObserver(checkIfDesktopNavigationWraps);resizeObserver.observe(primaryNav);}Drupal.behaviors.automaticMobileNav={attach(context){once('olivero-automatic-mobile-nav','[data-drupal-selector="primary-nav-menu--level-1"]',context).forEach(init);}};})(Drupal,once);;
((Drupal)=>{const searchWideButtonSelector='[data-drupal-selector="block-search-wide-button"]';const searchWideButton=document.querySelector(searchWideButtonSelector);const searchWideWrapperSelector='[data-drupal-selector="block-search-wide-wrapper"]';const searchWideWrapper=document.querySelector(searchWideWrapperSelector);function searchIsVisible(){return searchWideWrapper.classList.contains('is-active');}Drupal.olivero.searchIsVisible=searchIsVisible;function watchForClickOut(e){const clickInSearchArea=e.target.matches(`
      ${searchWideWrapperSelector},
      ${searchWideWrapperSelector} *,
      ${searchWideButtonSelector},
      ${searchWideButtonSelector} *
    `);if(!clickInSearchArea&&searchIsVisible())toggleSearchVisibility(false);}function watchForFocusOut(e){if(e.relatedTarget){const inSearchBar=e.relatedTarget.matches(`${searchWideWrapperSelector}, ${searchWideWrapperSelector} *`);const inSearchButton=e.relatedTarget.matches(`${searchWideButtonSelector}, ${searchWideButtonSelector} *`);if(!inSearchBar&&!inSearchButton)toggleSearchVisibility(false);}}function watchForEscapeOut(e){if(e.key==='Escape')toggleSearchVisibility(false);}function handleFocus(){if(searchIsVisible())searchWideWrapper.querySelector('input[type="search"]').focus();else{if(searchWideWrapper.contains(document.activeElement))searchWideButton.focus();}}function toggleSearchVisibility(visibility){searchWideButton.setAttribute('aria-expanded',visibility===true);searchWideWrapper.classList.toggle('is-active',visibility===true);searchWideWrapper.addEventListener('transitionend',handleFocus,{once:true});if(visibility===true){Drupal.olivero.closeAllSubNav();document.addEventListener('click',watchForClickOut,{capture:true});document.addEventListener('focusout',watchForFocusOut,{capture:true});document.addEventListener('keyup',watchForEscapeOut,{capture:true});}else{document.removeEventListener('click',watchForClickOut,{capture:true});document.removeEventListener('focusout',watchForFocusOut,{capture:true});document.removeEventListener('keyup',watchForEscapeOut,{capture:true});}}Drupal.olivero.toggleSearchVisibility=toggleSearchVisibility;Drupal.behaviors.searchWide={attach(context){const searchWideButtonEl=once('search-wide',searchWideButtonSelector,context).shift();if(searchWideButtonEl){searchWideButtonEl.setAttribute('aria-expanded',searchIsVisible());searchWideButtonEl.addEventListener('click',()=>{toggleSearchVisibility(!searchIsVisible());});}}};})(Drupal);;
