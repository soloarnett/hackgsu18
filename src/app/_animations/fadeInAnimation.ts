// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style, query, group } from '@angular/animations';
 
export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [
 
        // // route 'enter' transition
        // transition(':enter', [
 
        //     // css styles at start of transition
        //     style({ opacity: 0 }),
 
        //     // animation and styles at end of transition
        //     animate('.3s', style({ opacity: 1 }))
        // ]),
        // transition(':leave', [
 
        //     // css styles at start of transition
        //     style({ opacity: 1 }),
 
        //     // animation and styles at end of transition
        //     animate('.3s', style({ opacity: 0 }))
        // ]),

        transition('* <=> *', [
            /* order */
            /* 1 */ query(':enter, :leave', style({ })
              , { optional: true }),
            /* 2 */ group([  // block executes in parallel
              query(':enter', [
                style({ opacity: 0 }),
                animate('0.5s ease-in-out', style({ opacity: 1 }))
              ], { optional: true }),
              query(':leave', [
                style({ opacity: 1 }),
                animate('0.5s ease-in-out', style({ opacity: 0 }))
              ], { optional: true }),
            ])
          ])
    ]);