import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import '../../../../assets/landing/vendor/jquery-easing/jquery.easing.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../../assets/landing/js/jqBootstrapValidation.js';
import '../../../../assets/landing/js/contact_me.js';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initLanding();
  }

  initLanding = () => {
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (
        location.pathname.replace(/^\//, '') ===
          this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        let target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate(
            {
              scrollTop: target.offset().top - 54
            },
            1000,
            'easeInOutExpo'
          );
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(() => {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    // console.log($('body'));
    // $('body').scrollspy({
    //   target: '#mainNav',
    //   offset: 56
    // });

    // Collapse Navbar
    const navbarCollapse = () => {
      if ($('#mainNav').offset().top > 100) {
        $('#mainNav').addClass('navbar-shrink');
      } else {
        $('#mainNav').removeClass('navbar-shrink');
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  };
}
