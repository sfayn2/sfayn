import { Component  } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'
import gql from 'graphql-tag';
import { ProductsGQLService } from './products-graphql.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sfayn';
  opened: boolean = true;
  //menu = {};
  menu$: Subscription;
  dataLoaded: boolean = false;
  private _subscription: Subscription;
  constructor(private authService: AuthService,
              private productService: ProductService,
              private _location: Location,
	      private router: Router,
	      private productsGQLService: ProductsGQLService,
	      private apollo: Apollo) {

            apollo
                .watchQuery<any>({
                    query: gql`query {
                        Nav @client {
                            id
                            menu
                            arrow_back
                            side_bar
                            component
                            __typename
                    }
                }`,
            })
            .valueChanges
            .pipe(
               map(res => res.data.Nav 
            ),
            ).subscribe(res => this.menu$ = res);



  }

  ngOnInit() {

    this.productsGQLService.watch()
	    .valueChanges
	    .pipe(
		map(res => {
                    console.log("late na duma dating", res)
                    this.dataLoaded = true;
                                return "tapos";
                    
                })
	    ).subscribe();

   

  }




}

