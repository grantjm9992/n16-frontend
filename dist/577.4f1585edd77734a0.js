"use strict";(self.webpackChunknobleui_angular=self.webpackChunknobleui_angular||[]).push([[577],{5954:(g,l,i)=>{i.d(l,{s:()=>t});var h=i(5384),u=i(4650);let t=(()=>{class s extends h.s{getCompanies(){return this.get("/companies")}getCompany(p){return this.get(`/companies/${p}`)}updateCompany(p,a){return this.post(`/companies/${p}`,a)}createCompany(p){return this.post("/companies",p)}}return s.\u0275fac=function(){let r;return function(a){return(r||(r=u.n5z(s)))(a||s)}}(),s.\u0275prov=u.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},3577:(g,l,i)=>{i.r(l),i.d(l,{CompanyModule:()=>v});var h=i(6895),u=i(9585),t=i(4650),s=i(5954),r=i(3599);let p=(()=>{class n{constructor(e,o,c){this.companyApiService=e,this.router=o,this.activatedRoute=c,this.rows=[],this.loadingIndicator=!0,this.reorderable=!0,this.ColumnMode=u.hq}ngOnInit(){this.companyApiService.getCompanies().subscribe(e=>{this.rows=e.data,this.loadingIndicator=!1})}onRowClicked(e){"click"===e.type&&this.router.navigate([e.row.id],{relativeTo:this.activatedRoute})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(s.s),t.Y36(r.F0),t.Y36(r.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-company"]],decls:18,vars:5,consts:[[1,"page-breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","."],["aria-current","page",1,"breadcrumb-item","active"],[1,"row"],[1,"col-md-12","stretch-card"],[1,"card"],[1,"card-body"],[1,"card-title","d-flex","justify-content-between"],["routerLink","new","tabindex","-1","role","button",1,"btn","btn-primary"],[1,"table-responsive"],["rowHeight","auto",1,"bootstrap",3,"rows","loadingIndicator","columnMode","footerHeight","limit","activate"],["name","Name","prop","name"]],template:function(e,o){1&e&&(t.TgZ(0,"nav",0)(1,"ol",1)(2,"li",2)(3,"a",3),t._uU(4,"Companies"),t.qZA()(),t.TgZ(5,"li",4),t._uU(6,"List"),t.qZA()()(),t.TgZ(7,"div",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"h6",9),t._uU(12," Companies "),t.TgZ(13,"a",10),t._uU(14,"New"),t.qZA()(),t.TgZ(15,"div",11)(16,"ngx-datatable",12),t.NdJ("activate",function(d){return o.onRowClicked(d)}),t._UZ(17,"ngx-datatable-column",13),t.qZA()()()()()()),2&e&&(t.xp6(16),t.Q6J("rows",o.rows)("loadingIndicator",o.loadingIndicator)("columnMode",o.ColumnMode.force)("footerHeight",50)("limit",10))},dependencies:[r.yS,u.nE,u.UC]}),n})();var a=i(433);function y(n,m){if(1&n&&(t.TgZ(0,"p",17),t._uU(1),t.qZA()),2&n){const e=m.$implicit;t.xp6(1),t.Oqu(e)}}const f=[{path:"",component:p},{path:":id",component:(()=>{class n{constructor(e,o,c,d){this.router=e,this.activatedRoute=o,this.companyApiService=c,this.formBuilder=d,this.error=[],this.id=null}ngOnInit(){this.companyForm=this.formBuilder.group({name:["",a.kI.required]}),this.id=this.activatedRoute.snapshot.paramMap.get("id"),null!==this.id&&"new"!==this.id&&this.companyApiService.getCompany(this.id).subscribe(e=>{this.company=e.data,this.companyForm.patchValue(e.data)})}onSubmit(){this.error=[];const e={...this.company,...this.companyForm.value};"new"!==this.id?this.companyApiService.updateCompany(this.company.id,e).subscribe(()=>{this.router.navigate(["/company"])},o=>{if(o.errors)for(let c in o.errors)o.errors[c].forEach(d=>{this.error.push(d)});else this.error.push(o.message)}):this.companyApiService.createCompany(e).subscribe(()=>{this.router.navigate(["/company"])},o=>{if(o.errors)for(let c in o.errors)o.errors[c].forEach(d=>{this.error.push(d)});else this.error.push(o.message)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.F0),t.Y36(r.gz),t.Y36(s.s),t.Y36(a.qu))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-edit"]],decls:23,vars:3,consts:[[1,"page-breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","../"],["aria-current","page",1,"breadcrumb-item","active"],[1,"row"],[1,"col-md-6","grid-margin","stretch-card"],[1,"card"],[1,"card-body"],[1,"card-title"],[1,"forms-sample",3,"formGroup","ngSubmit"],[1,"mb-3"],["for","name",1,"form-label"],["type","text","id","name","autocomplete","off","placeholder","Name","formControlName","name",1,"form-control"],["type","submit",1,"btn","btn-primary","me-2"],["routerLink","../",1,"btn","btn-secondary"],["class","text-danger mt-1",4,"ngFor","ngForOf"],[1,"text-danger","mt-1"]],template:function(e,o){1&e&&(t.TgZ(0,"nav",0)(1,"ol",1)(2,"li",2)(3,"a",3),t._uU(4,"Companies"),t.qZA()(),t.TgZ(5,"li",4),t._uU(6),t.qZA()()(),t.TgZ(7,"div",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"h6",9),t._uU(12,"Company"),t.qZA(),t.TgZ(13,"form",10),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(14,"div",11)(15,"label",12),t._uU(16,"Name"),t.qZA(),t._UZ(17,"input",13),t.qZA(),t.TgZ(18,"button",14),t._uU(19,"Submit"),t.qZA(),t.TgZ(20,"div",15),t._uU(21,"Cancel"),t.qZA()(),t.YNc(22,y,2,1,"p",16),t.qZA()()()()),2&e&&(t.xp6(6),t.Oqu(null===o.company?"New":"Edit"),t.xp6(7),t.Q6J("formGroup",o.companyForm),t.xp6(9),t.Q6J("ngForOf",o.error))},dependencies:[h.sg,r.rH,r.yS,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u]}),n})()}];let v=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[h.ez,r.Bz.forChild(f),u.xD,a.u5,a.UX]}),n})()}}]);