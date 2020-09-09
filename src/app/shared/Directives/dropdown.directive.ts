import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') open = false;

  @HostListener('mouseenter') toggleOpen() {
    this.open = !this.open;
  }

  @HostListener('mouseleave') toggleClose() {
    this.open = !this.open;
  }

  constructor() { }


  ngOnInit() { }

}
