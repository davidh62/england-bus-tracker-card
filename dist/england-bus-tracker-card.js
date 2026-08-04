function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,_=g.trustedTypes,f=_?_.emptyScript:"",m=g.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,m?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,P=`<${M}>`,U=document,N=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,T="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,L=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),K=q(1),W=q(2),V=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),G=new WeakMap,Y=U.createTreeWalker(U,129);function Z(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===R?"!--"===l[1]?r=D:void 0!==l[1]?r=H:void 0!==l[2]?(I.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=o??R,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?L:'"'===l[3]?B:j):r===B||r===j?r=L:r===D||r===H?r=R:(r=L,o=void 0);const h=r===L&&t[e+1].startsWith("/>")?" ":"";n+=r===R?i+P:c>=0?(s.push(a),i.slice(0,c)+k+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=Q.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=c[n++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?ot:"@"===r[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),Y.nextNode(),a.push({type:2,index:++o});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);Y.currentNode=s;let o=Y.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Q(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=X(this,s[i+r],e,r),a===V&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===F?t=F:t!==F&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class nt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===V)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Q,et),(x.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ct extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(N(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},pt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}function _t(t,e){const i={nextBus:[],stops:[],vehicles:[],anomalies:[],routes:[],routeLabels:{},routeShapes:{}};if(!t)return i;const s=Object.keys(t.states).filter(i=>{if(!e)return!0;const s=t.entities?.[i];return s&&s.device_id===e}),o=new Set;for(const e of s){const s=t.states[e];if(!s)continue;const n=s.attributes||{},r=e.split(".")[0];if(n.route&&n.route_geojson&&(i.routeShapes[String(n.route)]={entityId:e,colour:n.route_colour?String(n.route_colour):"#1565c0"}),"sensor"===r&&n.route&&n.atco_code&&n.stop_name){const t=s.state&&"unknown"!==s.state&&"unavailable"!==s.state?new Date(s.state):null,r={entityId:e,route:String(n.route),towards:n.towards??"",atco:String(n.atco_code),stopName:String(n.stop_name),live:!0===n.live,minutesUntil:void 0!==n.minutes_until?Number(n.minutes_until):null,delayMinutes:void 0!==n.delay_minutes?Number(n.delay_minutes):0,when:t,departures:Array.isArray(n.departures)?n.departures.map(t=>({when:String(t.when),live:!0===t.live,delayMinutes:Number(t.delay_minutes??0),towards:String(t.towards??""),minutesUntil:Number(t.minutes_until??0),vehicleRef:null!=t.vehicle_ref?String(t.vehicle_ref):null})):[]};if(i.nextBus.push(r),o.add(r.route),r.towards){const t=i.routeLabels[r.route]||=[];t.includes(r.towards)||t.push(r.towards)}}else if("device_tracker"===r&&n.route_badge)"unavailable"!==s.state&&i.vehicles.push({entityId:e,route:String(n.route??""),towards:String(n.direction_label??n.destination??""),vehicleRef:null!=n.vehicle_ref?String(n.vehicle_ref):null,picture:n.entity_picture?String(n.entity_picture):null,journey:n.journey??null});else if("device_tracker"===r&&n.atco_code&&!n.route_badge){let s=String(n.friendly_name||e);const o=t.entities?.[e]?.device_id,r=o?t.devices?.[o]?.name_by_user||t.devices?.[o]?.name:"";r&&s.startsWith(r)&&(s=s.slice(r.length).trim()),i.stops.push({entityId:e,name:s||String(n.atco_code),atco:String(n.atco_code),lat:void 0!==n.latitude?Number(n.latitude):null,lon:void 0!==n.longitude?Number(n.longitude):null})}else if("binary_sensor"===r&&void 0!==n.consecutive_empty_polls&&void 0!==n.route)i.anomalies.push({entityId:e,route:String(n.route),on:"on"===s.state});else if("binary_sensor"===r&&void 0!==n.consecutive_empty_polls){const t=(n.friendly_name||e).match(/(\S+)\s+service anomaly/);i.anomalies.push({entityId:e,route:t?t[1]:"?",on:"on"===s.state})}}return i.nextBus.sort((t,e)=>t.route.localeCompare(e.route)||t.atco.localeCompare(e.atco)),i.routes=[...o].sort(),i}const ft=r`
  .board {
    border-radius: var(--ha-card-border-radius, 12px);
    padding: 14px 10px;
    text-align: center;
    line-height: 1.7;
  }
  .board.dot-matrix {
    font-family: "Doto", "VT323", "Courier New", monospace;
    letter-spacing: 0.5px;
  }
  .board .headline {
    font-weight: 700;
  }
  .board .headline:not(:first-child) {
    margin-top: 10px;
  }
  .board .banner {
    font-weight: 700;
    color: var(--ebt-banner, #ffa000);
    margin-bottom: 6px;
  }
  .board .dot {
    display: inline-block;
    margin-right: 4px;
  }
`;const mt={classic:{bg:"#000000",text:"#ffff00",accent:"#33ff33",font:"dot-matrix"},light:{bg:"#f5f5f5",text:"#222222",accent:"#1565c0",font:"dot-matrix"},theme:{bg:"var(--card-background-color)",text:"var(--primary-text-color)",accent:"var(--primary-color)",font:"clean"}};function $t(t,e,i,s){const o=mt[s.colourway??"classic"]??mt.classic,n=s.font_preset??o.font,r=s.bg??o.bg,a=s.text_color??o.text,l=s.accent_color??o.accent,c=t.nextBus.filter(t=>(0===e.length||e.includes(t.route))&&(0===i.length||i.includes(t.atco))),d=t.anomalies.filter(t=>t.on&&(0===e.length||e.includes(t.route))),h={};for(const t of c)h[t.route]=(h[t.route]||0)+1;return K`
    <div
      class="board ${n}"
      style="background:${r};color:${a}"
    >
      ${d.map(t=>K`<div class="banner">
            ⚠ ${t.route}: live tracking unavailable — times below are timetabled
          </div>`)}
      ${0===c.length?K`<div>No arrival sensors found — check the tracker selection.</div>`:F}
      ${c.map(t=>K`
          <div class="headline" style="color:${l}">
            Next ${t.route}${t.towards?` to ${t.towards}`:""} —
            ${function(t){return!t||isNaN(t.getTime())?"--:--":t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}(t.when)}${h[t.route]>1?` (Stand ${t.atco.slice(-1)})`:""}
          </div>
          <div>
            ${t.live?K`<span class="dot">●</span>`:F}${function(t){const e=t.delayMinutes>0?`${t.delayMinutes} min late`:"on time",i=null!==t.minutesUntil&&t.minutesUntil<=0?"Due":null!==t.minutesUntil?`arriving in ${t.minutesUntil} min`:"";return i?`${e} · ${i}`:e}(t)}
          </div>
        `)}
    </div>
  `}const vt=96,bt=r`
  .sign {
    padding: 6px 10px 10px;
  }
  .sign-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }
  .sign-title {
    font-weight: 700;
    font-size: 15px;
  }
  .sign-sub {
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .sign-when {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .sign-dot {
    color: var(--ebt-live, #2e7d32);
    margin-right: 3px;
  }
  .sign-late {
    color: var(--ebt-late, #c62828);
  }
  .dir-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    border: 1px solid var(--divider-color, #999);
    border-radius: 14px;
    padding: 2px 10px;
    font-size: 12px;
    background: transparent;
    color: var(--primary-text-color);
    user-select: none;
  }
  .dir-btn:hover {
    background: var(--secondary-background-color);
  }
  .ladder svg {
    display: block;
    width: 100%;
    height: auto;
    margin: 2px 0;
  }
  .sign-followed {
    font-size: 13px;
    color: var(--secondary-text-color);
    padding-top: 2px;
  }
  .ladder-hint {
    padding: 12px;
    color: var(--secondary-text-color);
    text-align: center;
    font-size: 13px;
  }
`;function yt(t){const e=new Date(t);return isNaN(e.getTime())?"--:--":e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}function wt(t,e,i){const s=[];for(const e of t)s.length&&s[s.length-1].n===e.n||s.push(e);const o=function(t,e){const i=t-1,s=new Set([0,Math.min(1,i),i]);e>0&&s.add(e);const o=8-s.size,n=[];for(let t=1;t<i;t++)s.has(t)||n.push(t);if(o>0&&n.length>0){const t=n.length/Math.min(o,n.length);for(let e=0;e<Math.min(o,n.length);e++)s.add(n[Math.floor(e*t)])}return[...s].sort((t,e)=>t-e)}(s.length,s.length-1),n=o[o.length-1],r=[];for(const t of o){const e=r.length?s[r[r.length-1]].n:null;s[t].n!==e?r.push(t):t===n&&(r[r.length-1]=t)}const a=r.length,l=t=>1===a?282:40+484*t/(a-1),c=[];for(let t=0;t<a-1;t++){const e=r[t+1]-r[t]>1||s[r[t+1]].gap;c.push(W`<line
      x1=${l(t)} y1=${vt} x2=${l(t+1)} y2=${vt}
      stroke="var(--secondary-text-color)" stroke-width="3"
      stroke-dasharray=${e?"7 6":F}
    />`)}if(r.forEach((t,e)=>{const i=s[t],o=l(e),n=e===a-1,r="var(--primary-color)",d=n?r:"var(--primary-text-color)",h=function(t){const e=t=>t.length>16?t.slice(0,15)+"…":t,i=t.trim(),s=i.indexOf(",");if(s>0)return[e(i.slice(0,s).trim()),e(i.slice(s+1).trim())];if(i.length<=15)return[i];let o=i.lastIndexOf(" ",15);return o<=0&&(o=i.indexOf(" ")),o<=0?[e(i)]:[e(i.slice(0,o)),e(i.slice(o+1).trim())]}(i.n);c.push(W`<circle
      cx=${o} cy=${vt} r=${n?7:5}
      fill=${n?r:"var(--card-background-color)"}
      stroke=${n?r:"var(--primary-text-color)"} stroke-width="2.5"
    />`),c.push(W`<g transform="translate(${o-2}, ${78}) rotate(-45)">
      ${h.map((t,e)=>W`<text x="0" y=${13*e} font-size="12.5"
            font-weight=${n?"700":"400"} fill=${d}
            font-family="inherit">${t}</text>`)}
    </g>`),c.push(W`<text x=${o} y=${122} text-anchor="middle"
      font-size="11.5" fill=${n?r:"var(--secondary-text-color)"}
      font-weight=${n?"700":"400"} font-family="inherit">${yt(i.t)}</text>`)}),a>=2&&i){const t=l(0)+Math.min(1,Math.max(0,e))*(l(1)-l(0));c.push(W`<image href=${i} x=${t-20} y=${76}
      width="40" height="40" />`)}return K`<div class="ladder">
    <svg viewBox="0 0 ${640} ${150}" preserveAspectRatio="xMidYMid meet">
      ${c}
    </svg>
  </div>`}const xt=["map","board","ladder"];class At extends ct{constructor(){super(...arguments),this._ladderDest=null,this._mapEl=null,this._mapKey=""}_ladderKey(){return`ebt-ladder-dir:${this._config?.device_id??""}:${this._config?.ladder?.route??"*"}`}_cycleLadderDest(t){this._ladderDest=t;try{window.localStorage.setItem(this._ladderKey(),t)}catch{}}setConfig(t){this._config={show_board:!0,...t},this._mapEl=null,this._mapKey="";try{this._ladderDest=window.localStorage.getItem(this._ladderKey())}catch{this._ladderDest=null}}getCardSize(){let t=1;return this._config?.show_board&&(t+=3),this._config?.show_map&&(t+=this._config?.map?.height??8),this._config?.show_ladder&&(t+=3),t}static getStubConfig(){return{show_board:!0,show_map:!1,routes:[],stops:[]}}_title(){if(!1===this._config?.show_title)return;if(this._config?.title)return this._config.title;const t=this._config?.device_id;if(t){const e=this.hass?.devices?.[t];return e?.name_by_user||e?.name}}async _ensureMap(t){if(!this._config?.show_map)return;const e=function(t,e,i,s){const o=0===i.length?t.stops:t.stops.filter(t=>i.includes(t.atco)),n=o.map(t=>t.entityId),r=o.map(t=>t.lat).filter(t=>null!==t),a=o.map(t=>t.lon).filter(t=>null!==t),l=r.length?r.reduce((t,e)=>t+e,0)/r.length:void 0,c=a.length?a.reduce((t,e)=>t+e,0)/a.length:void 0,d=e.length?e:t.routes,h=0===d.length?"*":1===d.length?d[0]:`/^(${d.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})$/`,p={type:"custom:map-card",card_size:Math.min(12,Math.max(4,s.height??8)),zoom:s.zoom??14,theme_mode:s.theme_mode??"light",focus_follow:"none",tile_layer_options:{maxZoom:20}};void 0!==l&&void 0!==c&&(p.x=l,p.y=c);const u=0===e.length?Object.keys(t.routeShapes):e,g=!1===s.show_route_line?[]:u.map(e=>t.routeShapes[e]).filter(t=>!!t).map(t=>({entity_id:t.entityId,options:{geojson:{attribute:"route_geojson",color:s.line_colour||"#7b1fa2",weight:4,opacity:.7,hide_marker:!0}}}));return{type:"custom:auto-entities",card:p,card_param:"entities",filter:{include:[...g,...n.map(t=>({entity_id:t,options:{display:"icon",icon:"mdi:bus-stop",color:"#d32f2f",size:s.stop_size??30,z_index_offset:100}})),{integration:"uk_bus_tracker",domain:"device_tracker",attributes:{route_badge:"*",route:h},options:{display:"marker",label:" ",size:s.marker_size??64,color:"transparent",css:"--card-background-color: transparent; --ha-marker-border-radius: 0;",z_index_offset:1e3}}],exclude:[{state:"unavailable"}]}}}(t,this._config.routes??[],this._config.stops??[],this._config.map??{}),i=JSON.stringify(e);if(this._mapEl&&i===this._mapKey)this._mapEl.hass=this.hass;else{this._mapKey=i;try{const t=(await window.loadCardHelpers()).createCardElement(e);t.hass=this.hass,this._mapEl=t,this.requestUpdate()}catch(t){console.error("england-bus-tracker-card: map embed failed",t)}}}render(){if(!this._config||!this.hass)return F;const t=_t(this.hass,this._config.device_id),e=this._config.routes??[],i=this._config.stops??[];this._config.show_map&&this._ensureMap(t);const s=[...this._config.order??[],...xt.filter(t=>!(this._config.order??[]).includes(t))],o=s.map(s=>"map"===s&&this._config.show_map?K`<div class="section map-wrap">
          ${this._mapEl??K`<div class="hint">Loading map…</div>`}
        </div>`:"board"===s&&this._config.show_board?K`<div class="section">
          ${$t(t,e,i,this._config.board??{})}
        </div>`:"ladder"===s&&this._config.show_ladder?K`<div class="section">
          ${function(t,e,i,s,o,n){const r=t.nextBus.filter(t=>t.departures.length&&(0===i.length||i.includes(t.atco))&&(0===e.length||e.includes(t.route))),a=s.route||r[0]?.route;if(!a)return K`<div class="ladder-hint">
      No departures to show yet — pick a route with tracked stops.
    </div>`;const l=[];for(const t of r)if(t.route===a)for(const e of t.departures)l.push({...e,atco:t.atco,stopName:t.stopName});if(!l.length)return K`<div class="ladder-hint">
      No upcoming ${a} departures right now.
    </div>`;const c=[];for(const t of l.slice().sort((t,e)=>t.when.localeCompare(e.when)))t.towards&&!c.includes(t.towards)&&c.push(t.towards);const d=o&&c.includes(o)?o:s.towards&&c.includes(s.towards)?s.towards:c[0],h=new Set,p=l.filter(t=>t.towards===d).sort((t,e)=>t.when.localeCompare(e.when)).filter(t=>{const e=`${t.when}|${t.vehicleRef??""}`;return!h.has(e)&&(h.add(e),!0)}),u=p[0],g=p[1],_=c.length>1?K`<button
          class="dir-btn"
          @click=${()=>n(c[(c.indexOf(d)+1)%c.length])}
          title="Change direction"
        >
          <ha-icon icon="mdi:swap-horizontal"></ha-icon>${d}
        </button>`:F;if(!u)return K`<div class="sign">
      <div class="sign-head">
        <span class="sign-title">${a} to ${d}</span>${_}
      </div>
      <div class="ladder-hint">No upcoming departures in this direction.</div>
    </div>`;let f=F;if(u.live&&u.vehicleRef){const e=t.vehicles.find(t=>t.vehicleRef===u.vehicleRef&&t.route===a),i=e?function(t,e){const i=t.journey?.stops;if(!i)return null;const s=i.findIndex(t=>t.a===e);return s<1?null:i.slice(0,s+1)}(e,u.atco):null;e&&i&&i.length>=2&&(f=wt(i,e.journey?.progress??0,e.picture))}const m=K`${u.live?K`<span class="sign-dot">●</span>`:F}${u.minutesUntil<=0?"Due":`${u.minutesUntil} min`}${u.live&&u.delayMinutes>0?K` · <span class="sign-late">${u.delayMinutes} min late</span>`:u.live?" · on time":""}`;return K`<div class="sign">
    <div class="sign-head">
      <span class="sign-title">Next ${a} to ${d}</span>${_}
    </div>
    <div class="sign-head">
      <span class="sign-sub">${m}</span>
      <span class="sign-when">${yt(u.when)}</span>
    </div>
    ${f}
    ${g&&!1!==s.show_caption?(()=>{const t=new Date(g.when),e=new Date,i=Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime())/864e5),s=1===i?"First bus tomorrow":i>1?`First bus ${t.toLocaleDateString("en-GB",{weekday:"long"})}`:"Followed by",o=i<=0;return K`<div class="sign-followed">
            ${s} <span class="sign-when">${yt(g.when)}</span>${g.live&&o?K` <span class="sign-dot">●</span>`:F}${o&&g.minutesUntil>0?` (${g.minutesUntil} min)`:""}
          </div>`})():F}
  </div>`}(t,e,i,this._config.ladder??{},this._ladderDest,t=>this._cycleLadderDest(t))}
        </div>`:F),n=this._title(),r=!this._config.device_id&&0===t.nextBus.length&&0===t.stops.length;return K`
      <ha-card>
        ${n?K`<h1 class="card-header">${n}</h1>`:F}
        ${r?K`<div class="hint">
              Pick your England Bus Tracker in the card editor to get started.
            </div>`:F}
        ${o}
      </ha-card>
    `}updated(){this._mapEl&&(this._mapEl.hass=this.hass)}static getConfigElement(){return document.createElement("england-bus-tracker-card-editor")}}At.styles=[ft,bt,r`
      ha-card {
        overflow: hidden;
      }
      h1.card-header {
        padding: 12px 16px 0;
        margin: 0;
        font-size: var(--ha-card-header-font-size, 24px);
        color: var(--ha-card-header-color, var(--primary-text-color));
        font-weight: 400;
      }
      .section {
        margin: 8px;
      }
      .map-wrap {
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }
      .hint {
        padding: 12px;
        color: var(--secondary-text-color);
        text-align: center;
      }
    `],t([ut({attribute:!1})],At.prototype,"hass",void 0),t([gt()],At.prototype,"_config",void 0),t([gt()],At.prototype,"_ladderDest",void 0);const St={map:"Map display",board:"Announcement board",ladder:"Route ladder"},Et=["map","board","ladder"],kt=[{value:"classic",label:"Classic board (black / yellow / green)"},{value:"light",label:"Light"},{value:"theme",label:"Follow HA theme"}],Ct=[{value:"light",label:"Light"},{value:"dark",label:"Dark"},{value:"auto",label:"Auto"}];class Mt extends ct{constructor(){super(...arguments),this._helpersLoaded=!1}async connectedCallback(){if(super.connectedCallback(),!customElements.get("ha-selector"))try{const t=(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]});t.hass=this.hass,await(t.constructor.getConfigElement?.())}catch(t){console.warn("england-bus-tracker-card: helper preload",t)}this._helpersLoaded=!0}setConfig(t){this._config=t}_update(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateSub(t,e,i){this._update({[t]:{...this._config?.[t]??{},[e]:i}})}_text(t,e,i){return K`<div class="field">
      <label>${t}</label>
      <input
        type="text"
        autocomplete="off"
        .value=${e}
        @input=${t=>i(t.target.value)}
      />
    </div>`}_sel(t,e,i,s){return K`<ha-selector
      .hass=${this.hass}
      .label=${t}
      .selector=${e}
      .value=${i}
      .required=${!1}
      @value-changed=${t=>s(t.detail.value)}
    ></ha-selector>`}_toggleIn(t,e,i,s){let o=this._config?.[t]?.length?[...this._config[t]]:[...e];s&&!o.includes(i)&&o.push(i),s||(o=o.filter(t=>t!==i)),this._update({[t]:o.length===e.length?[]:o})}_order(){const t=this._config?.order??[];return[...t,...Et.filter(e=>!t.includes(e))]}_move(t,e){const i=this._order(),s=i.indexOf(t),o=s+e;o<0||o>=i.length||([i[s],i[o]]=[i[o],i[s]],this._update({order:i}))}_sectionEnabled(t){return"map"===t?!0===this._config?.show_map:"board"===t?!1!==this._config?.show_board:!0===this._config?.show_ladder}_setSection(t,e){"map"===t?this._update({show_map:e}):"board"===t?this._update({show_board:e}):this._update({show_ladder:e})}render(){if(!this.hass||!this._config||!this._helpersLoaded)return F;const t=_t(this.hass,this._config.device_id),e=this._config.routes?.length?this._config.routes:t.routes,i=t.stops.map(t=>t.atco),s=this._config.stops?.length?this._config.stops:i,o=this._config.board??{},n=this._config.map??{},r=this._order();return K`
      <!-- Identity -->
      <div class="section">
        ${this._text("Card title (blank = monitor name)",this._config.title??"",t=>this._update({title:t||void 0}))}
        <div class="row">
          <span>Show title</span>
          <ha-switch
            .checked=${!1!==this._config.show_title}
            @change=${t=>this._update({show_title:t.target.checked})}
          ></ha-switch>
        </div>
        ${this._sel("Tracker",{device:{filter:{integration:"uk_bus_tracker"}}},this._config.device_id,t=>this._update({device_id:t||void 0}))}

        ${this._config.device_id?F:K`<div class="muted" style="font-size:13px">
              Pick your tracker above — stops and routes appear once it's
              chosen.
            </div>`}
        ${this._config.device_id&&t.stops.length?K`<div class="group-label">Stops to monitor</div>
              <div class="checks">
                ${t.stops.map(t=>K`<label class="check">
                    <ha-checkbox
                      .checked=${s.includes(t.atco)}
                      @change=${e=>this._toggleIn("stops",i,t.atco,e.target.checked)}
                    ></ha-checkbox>
                    <span>${t.name}</span>
                  </label>`)}
              </div>`:F}
        ${this._config.device_id&&t.routes.length?K`<div class="group-label">Routes to monitor</div>
              <div class="checks">
                ${t.routes.map(i=>{const s=t.routeLabels[i]?.join(" / ")??"";return K`<label class="check">
                    <ha-checkbox
                      .checked=${e.includes(i)}
                      @change=${e=>this._toggleIn("routes",t.routes,i,e.target.checked)}
                    ></ha-checkbox>
                    <span>${i}${s?` → ${s}`:""}</span>
                  </label>`})}
              </div>`:F}
      </div>

      <!-- Sections, in display order, reorderable -->
      ${r.map((e,i)=>{const s=this._sectionEnabled(e);return K`
          <div class="row">
            <div class="left">
              <ha-icon-button
                .disabled=${0===i}
                @click=${()=>this._move(e,-1)}
                ><ha-icon icon="mdi:chevron-up"></ha-icon
              ></ha-icon-button>
              <ha-icon-button
                .disabled=${i===r.length-1}
                @click=${()=>this._move(e,1)}
                ><ha-icon icon="mdi:chevron-down"></ha-icon
              ></ha-icon-button>
              <span>
                ${St[e]}${"map"===e?K` <span class="muted"
                      >(needs ha-map-card + auto-entities)</span
                    >`:""}
              </span>
            </div>
            <ha-switch
              .checked=${s}
              @change=${t=>this._setSection(e,t.target.checked)}
            ></ha-switch>
          </div>
          ${"board"===e&&s?K`<ha-expansion-panel outlined header="Board options">
                <div class="panel-body">
                  ${this._sel("Colourway",{select:{mode:"dropdown",options:kt}},o.colourway??"classic",t=>this._updateSub("board","colourway",t))}
                  ${this._text("Headline colour override (blank = colourway)",o.accent_color??"",t=>this._updateSub("board","accent_color",t||void 0))}
                  ${this._text("Text colour override (blank = colourway)",o.text_color??"",t=>this._updateSub("board","text_color",t||void 0))}
                  ${this._text("Background override (blank = colourway)",o.bg??"",t=>this._updateSub("board","bg",t||void 0))}
                </div>
              </ha-expansion-panel>`:F}
          ${"ladder"===e&&s?K`<ha-expansion-panel outlined header="Ladder options">
                <div class="panel-body">
                  ${this._sel("Bus to follow",{select:{mode:"dropdown",options:[{value:"auto",label:"Auto — next bus to your stop"},...t.routes.flatMap(e=>{const i=t.routeLabels[e]??[];return i.length>1?[{value:e,label:`${e} — either direction`},...i.map(t=>({value:`${e}::${t}`,label:`${e} → ${t}`}))]:[{value:e,label:`Route ${e}`}]})]}},this._config.ladder?.towards?`${this._config.ladder.route}::${this._config.ladder.towards}`:this._config.ladder?.route||"auto",t=>{const[e,i]="auto"===t?[void 0,void 0]:t.split("::");this._update({ladder:{...this._config?.ladder??{},route:e||void 0,towards:i||void 0}})})}
                  <div class="row">
                    <span>Caption line</span>
                    <ha-switch
                      .checked=${!1!==this._config.ladder?.show_caption}
                      @change=${t=>this._update({ladder:{...this._config?.ladder??{},show_caption:t.target.checked}})}
                    ></ha-switch>
                  </div>
                </div>
              </ha-expansion-panel>`:F}
          ${"map"===e&&s?K`<ha-expansion-panel outlined header="Map options">
                <div class="panel-body">
                  <div class="row">
                    <span
                      >Route line
                      <span class="muted">(where the operator publishes one)</span></span
                    >
                    <ha-switch
                      .checked=${!1!==n.show_route_line}
                      @change=${t=>this._updateSub("map","show_route_line",t.target.checked)}
                    ></ha-switch>
                  </div>
                  ${!1!==n.show_route_line?this._text("Route line colour (blank = auto from badge)",n.line_colour??"",t=>this._updateSub("map","line_colour",t||void 0)):F}
                  ${this._sel("Map height",{number:{min:4,max:12,mode:"slider"}},n.height??8,t=>this._updateSub("map","height",t??8))}
                  ${this._sel("Zoom",{number:{min:8,max:20,mode:"slider"}},n.zoom??14,t=>this._updateSub("map","zoom",t??14))}
                  ${this._sel("Tiles",{select:{mode:"dropdown",options:Ct}},n.theme_mode??"light",t=>this._updateSub("map","theme_mode",t))}
                  ${this._sel("Badge size (px)",{number:{min:32,max:96,step:4,mode:"slider"}},n.marker_size??64,t=>this._updateSub("map","marker_size",t??64))}
                  ${this._sel("Stop marker size (px)",{number:{min:8,max:48,step:2,mode:"slider"}},n.stop_size??30,t=>this._updateSub("map","stop_size",t??30))}
                </div>
              </ha-expansion-panel>`:F}
        `})}
    `}}Mt.styles=r`
    .section {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }
    .row .left {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .checks {
      display: flex;
      flex-wrap: wrap;
      gap: 0 16px;
    }
    .check {
      display: flex;
      align-items: center;
    }
    .check span {
      margin-left: 2px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .group-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: -6px;
    }
    ha-expansion-panel {
      margin: 0 0 8px;
    }
    .panel-body {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    ha-icon-button {
      --mdc-icon-button-size: 32px;
      --mdc-icon-size: 18px;
    }
    .field {
      display: flex;
      flex-direction: column;
    }
    .field label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .field input {
      background: var(--mdc-text-field-fill-color, rgba(127, 127, 127, 0.08));
      border: none;
      border-bottom: 1px solid var(--divider-color, #666);
      border-radius: 4px 4px 0 0;
      color: var(--primary-text-color);
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
    }
    .field input:focus {
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 9px;
    }
  `,t([ut({attribute:!1})],Mt.prototype,"hass",void 0),t([gt()],Mt.prototype,"_config",void 0),t([gt()],Mt.prototype,"_helpersLoaded",void 0);customElements.define("england-bus-tracker-card",At),customElements.define("england-bus-tracker-card-editor",Mt),window.customCards=window.customCards||[],window.customCards.push({type:"england-bus-tracker-card",name:"England Bus Tracker Card",description:"Live bus departure board and map for the England Bus Tracker integration — zero-YAML visual editor.",preview:!0,documentation_url:"https://github.com/davidh62/england-bus-tracker-card"}),console.info("%c ENGLAND BUS TRACKER CARD %c v0.4.7 ","background:#1565c0;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px","background:#ffff00;color:#000;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px");
