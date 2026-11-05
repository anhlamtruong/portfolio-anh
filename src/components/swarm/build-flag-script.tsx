import { SESSION_KEY } from "./palette";
import { OPT_IN_KEY } from "./motion";

// Runs in <head> before first paint. Sets html[data-build="on"] (which hides
// unbuilt items) unless the visitor prefers reduced motion (and has not opted
// in with ?build=force or the "watch" button), the URL has ?build=off, or this
// tab already watched the whole build. Failsafe: if the engine has not
// started 3 s after load (or 8 s after this ran), the flag is removed so all
// content shows.
const CODE = `(function(){try{var d=document.documentElement,w=window,q=location.search;
if(/[?&]build=off(&|$)/.test(q))return;
var force=/[?&]build=force(&|$)/.test(q);
if(!force){try{force=sessionStorage.getItem('${OPT_IN_KEY}')==='1'}catch(e){}}
if(!force&&w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(force)d.setAttribute('data-build-force','');
if(!/[?&]build=force(&|$)/.test(q)){try{if(sessionStorage.getItem('${SESSION_KEY}')==='all')return}catch(e){}}
d.setAttribute('data-build','on');
var fail=function(){if(!w.__swarmReady)d.removeAttribute('data-build')};
var arm=function(){setTimeout(fail,3000)};
if(document.readyState==='complete')arm();else w.addEventListener('load',arm);
setTimeout(fail,8000)}catch(e){}})();`;

/** Server-safe inline <head> script for the build flag. */
export function BuildFlagScript() {
  return <script id="swarm-build-flag" dangerouslySetInnerHTML={{ __html: CODE }} />;
}
