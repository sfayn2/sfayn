import { Component  } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
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
  menu$: any;
  dataLoaded: boolean = false;
  constructor(private productsGQLService: ProductsGQLService,
              private _location: Location,
	            private apollo: Apollo) {

    apollo.watchQuery<any>({
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
    .pipe(map(res => res.data.Nav),
    ).subscribe(res => this.menu$ = res);

  }

  ngOnInit() {

    this.productsGQLService.watch()
    .valueChanges
    .subscribe(res => {
      this.dataLoaded = true;
      console.log('loaded products', res)
    });

  }




}

