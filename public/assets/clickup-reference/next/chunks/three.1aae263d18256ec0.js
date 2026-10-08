"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8233],{37731:(e,r,t)=>{t.d(r,{_:()=>v});var n=t(9506),a=t(16466),s=t(61658),i=t(40999);let o=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function l(e,r){let t=(0,i.C)(e=>e.gl),n=(0,i.G)(s.Tap,o(e)?Object.values(e):e);return(0,a.useLayoutEffect)(()=>{null==r||r(n)},[r]),(0,a.useEffect)(()=>{if("initTexture"in t){let e=[];Array.isArray(n)?e=n:n instanceof s.gPd?e=[n]:o(n)&&(e=Object.values(n)),e.forEach(e=>{e instanceof s.gPd&&t.initTexture(e)})}},[t,n]),(0,a.useMemo)(()=>{if(!o(e))return n;{let r={},t=0;for(let a in e)r[a]=n[t++];return r}},[e,n])}l.preload=e=>i.G.preload(s.Tap,e),l.clear=e=>i.G.clear(s.Tap,e);let c=parseInt(s.sPf.replace(/\D+/g,"")),u=function(e,r,t,n){var a;return(a=class extends s.BKk{constructor(n){for(let a in super({vertexShader:r,fragmentShader:t,...n}),e)this.uniforms[a]=new s.nc$(e[a]),Object.defineProperty(this,a,{get(){return this.uniforms[a].value},set(e){this.uniforms[a].value=e}});this.uniforms=s.LlO.clone(this.uniforms)}}).key=s.cj9.generateUUID(),a}({color:new s.Q1f("white"),scale:new s.I9Y(1,1),imageBounds:new s.I9Y(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${c>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),f=a.forwardRef(({children:e,color:r,segments:t=1,scale:s=1,zoom:o=1,grayscale:l=0,opacity:c=1,radius:f=0,texture:d,toneMapped:m,transparent:v,side:p,...h},g)=>{(0,i.e)({ImageMaterial:u});let y=a.useRef(null),w=(0,i.C)(e=>e.size),x=Array.isArray(s)?[s[0],s[1]]:[s,s],b=[d.image.width,d.image.height],j=Math.max(w.width,w.height);return a.useImperativeHandle(g,()=>y.current,[]),a.useLayoutEffect(()=>{y.current.geometry.parameters&&y.current.material.scale.set(x[0]*y.current.geometry.parameters.width,x[1]*y.current.geometry.parameters.height)},[x[0],x[1]]),a.createElement("mesh",(0,n.A)({ref:y,scale:Array.isArray(s)?[...s,1]:s},h),a.createElement("planeGeometry",{args:[1,1,t,t]}),a.createElement("imageMaterial",{color:r,map:d,zoom:o,grayscale:l,opacity:c,scale:x,imageBounds:b,resolution:j,radius:f,toneMapped:m,transparent:v,side:p,key:u.key}),e)}),d=a.forwardRef(({url:e,...r},t)=>{let s=l(e);return a.createElement(f,(0,n.A)({},r,{texture:s,ref:t}))}),m=a.forwardRef(({url:e,...r},t)=>a.createElement(f,(0,n.A)({},r,{ref:t}))),v=a.forwardRef((e,r)=>{if(e.url)return a.createElement(d,(0,n.A)({},e,{ref:r}));if(e.texture)return a.createElement(m,(0,n.A)({},e,{ref:r}));throw Error("<Image /> requires a url or texture")})},65196:(e,r,t)=>{t.d(r,{Hl:()=>u});var n=t(40999),a=t(16466),s=t(58745),i=t(5799),o=t(38681),l=t(67002);function c({ref:e,children:r,fallback:t,resize:o,style:c,gl:u,events:f=n.f,eventSource:d,eventPrefix:m,shadows:v,linear:p,flat:h,legacy:g,orthographic:y,frameloop:w,dpr:x,performance:b,raycaster:j,camera:M,scene:P,onPointerMissed:E,onCreated:z,...A}){a.useMemo(()=>(0,n.e)(s),[]);let R=(0,n.u)(),[B,C]=(0,i.A)({scroll:!0,debounce:{scroll:50,resize:0},...o}),S=a.useRef(null),_=a.useRef(null);a.useImperativeHandle(e,()=>S.current);let k=(0,n.a)(E),[I,T]=a.useState(!1),[U,L]=a.useState(!1);if(I)throw I;if(U)throw U;let H=a.useRef(null);(0,n.b)(()=>{let e=S.current;C.width>0&&C.height>0&&e&&(H.current||(H.current=(0,n.c)(e)),async function(){await H.current.configure({gl:u,scene:P,events:f,shadows:v,linear:p,flat:h,legacy:g,orthographic:y,frameloop:w,dpr:x,performance:b,raycaster:j,camera:M,size:C,onPointerMissed:(...e)=>null==k.current?void 0:k.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(d?(0,n.i)(d)?d.current:d:_.current),m&&e.setEvents({compute:(e,r)=>{let t=e[m+"X"],n=e[m+"Y"];r.pointer.set(t/r.size.width*2-1,-(2*(n/r.size.height))+1),r.raycaster.setFromCamera(r.pointer,r.camera)}}),null==z||z(e)}}),H.current.render((0,l.jsx)(R,{children:(0,l.jsx)(n.E,{set:L,children:(0,l.jsx)(a.Suspense,{fallback:(0,l.jsx)(n.B,{set:T}),children:null!=r?r:null})})}))}())}),a.useEffect(()=>{let e=S.current;if(e)return()=>(0,n.d)(e)},[]);let G=d?"none":"auto";return(0,l.jsx)("div",{ref:_,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:G,...c},...A,children:(0,l.jsx)("div",{ref:B,style:{width:"100%",height:"100%"},children:(0,l.jsx)("canvas",{ref:S,style:{display:"block"},children:t})})})}function u(e){return(0,l.jsx)(o.Af,{children:(0,l.jsx)(c,{...e})})}t(99366)},79432:(e,r,t)=>{t.d(r,{s0:()=>u});var n=t(67002),a=t(16466),s=t(61658),i=t(40999),o=t(34637);t(52269),t(42011);let l=(0,a.createContext)(null),c=e=>(2&e.getAttributes())==2,u=(0,a.memo)((0,a.forwardRef)(({children:e,camera:r,scene:t,resolutionScale:u,enabled:f=!0,renderPriority:d=1,autoClear:m=!0,depthBuffer:v,enableNormalPass:p,stencilBuffer:h,multisampling:g=8,frameBufferType:y=s.ix0},w)=>{let{gl:x,scene:b,camera:j,size:M}=(0,i.C)(),P=t||b,E=r||j,[z,A,R]=(0,a.useMemo)(()=>{let e=new o.s0(x,{depthBuffer:v,stencilBuffer:h,multisampling:g,frameBufferType:y});e.addPass(new o.AH(P,E));let r=null,t=null;return p&&((t=new o.Xe(P,E)).enabled=!1,e.addPass(t),void 0!==u&&((r=new o.SP({normalBuffer:t.texture,resolutionScale:u})).enabled=!1,e.addPass(r))),[e,t,r]},[E,x,v,h,g,y,P,p,u]);(0,a.useEffect)(()=>z?.setSize(M.width,M.height),[z,M]),(0,i.D)((e,r)=>{if(f){let e=x.autoClear;x.autoClear=m,h&&!m&&x.clearStencil(),z.render(r),x.autoClear=e}},f?d:0);let B=(0,a.useRef)(null);(0,a.useLayoutEffect)(()=>{let e=[],r=B.current.__r3f;if(r&&z){let t=r.children;for(let r=0;r<t.length;r++){let n=t[r].object;if(n instanceof o.Mj){let a=[n];if(!c(n)){let e=null;for(;(e=t[r+1]?.object)instanceof o.Mj&&!c(e);)a.push(e),r++}let s=new o.Vu(E,...a);e.push(s)}else n instanceof o.oF&&e.push(n)}for(let r of e)z?.addPass(r);A&&(A.enabled=!0),R&&(R.enabled=!0)}return()=>{for(let r of e)z?.removePass(r);A&&(A.enabled=!1),R&&(R.enabled=!1)}},[z,e,E,A,R]),(0,a.useEffect)(()=>{let e=x.toneMapping;return x.toneMapping=s.y_p,()=>{x.toneMapping=e}},[x]);let C=(0,a.useMemo)(()=>({composer:z,normalPass:A,downSamplingPass:R,resolutionScale:u,camera:E,scene:P}),[z,A,R,u,E,P]);return(0,a.useImperativeHandle)(w,()=>z,[z]),(0,n.jsx)(l.Provider,{value:C,children:(0,n.jsx)("group",{ref:B,children:e})})}));o.Mj,o.bv,o.i,o.hH;var f=(e=>(e[e.Linear=0]="Linear",e[e.Radial=1]="Radial",e[e.MirroredLinear=2]="MirroredLinear",e))(f||{});o.Mj,o.To;o.Mj;o.Mj;o.Mj},85172:(e,r,t)=>{t.d(r,{o:()=>a});var n=t(61658);class a{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}new n.qUd(-1,1,1,-1,0,1);class s extends n.LoY{constructor(){super(),this.setAttribute("position",new n.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new n.qtW([0,2,0,0,2,0],2))}}new s}}]);