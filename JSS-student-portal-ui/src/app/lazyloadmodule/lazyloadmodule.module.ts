import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { RouterModule, Routes } from '@angular/router';
import { lazyloadAuthGuard } from './lazyload-auth.guard';

const routes: Routes = [
  { path: 'comp1', component: Component1Component },
  { path: 'comp2', component: Component2Component, canActivate: [lazyloadAuthGuard] },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),Component1Component,Component2Component
  ],
  exports: [RouterModule]
})
export class LazyloadmoduleModule { }
