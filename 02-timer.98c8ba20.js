function t(t){return t.toString().padStart(2,"0")}const e=document.getElementById("datetime-picker"),n=document.querySelector("[data-days]"),o=document.querySelector("[data-hours]"),a=document.querySelector("[data-minutes]"),r=document.querySelector("[data-seconds]");let u=null,c=null;function d(){const e=new Date,d=(s=c,l=e,Math.abs(s-l));var s,l;const{days:i,hours:m,minutes:h,seconds:f}=function(t){const e=1e3,n=60*e,o=60*n,a=24*o,r=Math.floor(t/a),u=Math.floor(t%a/o),c=Math.floor(t%a%o/n),d=Math.floor(t%a%o%n/e);return{days:r,hours:u,minutes:c,seconds:d}}(d);n.textContent=t(i),o.textContent=t(m),a.textContent=t(h),r.textContent=t(f),d<=0&&clearInterval(u)}flatpickr(e,{enableTime:!0,dateFormat:"Y-m-d H:i",minDate:"today",onChange:function(t,e){new Date(e)<=new Date?window.alert("Please choose a date in the future"):(c=new Date(e),u=setInterval(d,1e3),d())}});
//# sourceMappingURL=02-timer.98c8ba20.js.map