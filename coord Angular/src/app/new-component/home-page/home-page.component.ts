import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { Router } from '@angular/router';
import { passValueService } from 'src/app/Services/passValue.service';
import { Item } from 'src/app/Models/Item';
import { LoginService } from 'src/app/Services/login.service';
import { CurrentUsers } from 'src/app/Models/CurrentUser';
import { ItemService } from 'src/app/Services/item.service';
import { EditModalComponent } from 'src/app/Components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';
import { AddBoardModelComponent } from 'src/app/Components/add-board-model/add-board-model.component';
import { TabName } from '../nav-bar/nav-bar.component';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { itemsSelector } from '../store/reducer/items.reducer';
import { ToastrService } from 'ngx-toastr';
import { LoginSuccess } from '../auth-store/auth-store.actions';
import { AddItems } from '../store/action/items.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService,
    private store: Store,
    private toasterService: ToastrService
  ) {
    console.log('11111111111', itemService.getItemByIdBasedOnTabName1('home', 1));
    this.items$ = this.store.pipe(select(itemsSelector));
    this.items$
      .pipe(take(1)) // only take the first emission
      .subscribe(items => {
        if (!items || items.length === 0) {
          const id = parseInt(sessionStorage.getItem('id') || '1', 10);
          const email = sessionStorage.getItem('email');
          if (id && email) {
            this.store.dispatch(new LoginSuccess({ id, email }));
            this.itemService.getItemByIdBasedOnTabName('home', id).subscribe((items) => {
              this.store.dispatch(new AddItems({ items }));
            });
          }
        }
      });
  }

  list: number = 0;
  item: Item[] = [];
  user!: CurrentUsers;
  star: string = 'fa-regular fa-star';
  starBoolen: boolean = false;
  tagList: string[] = [];
  abc: any;
  modifiedDate: boolean = false;
  mail!: string;
  id: number = 0;
  userId: number = 1;

  tabHeaderName: string = 'Home';

  items$!: Observable<Item[]>;

  ngOnInit() {
    // const a = sessionStorage.getItem('email');
    // const b = sessionStorage.getItem('id');
    // if (b) {
    //   this.id = parseInt(b);
    // }
    // if (a !== null) {
    //   this.getByMail(a);
    //   this.mail = a;
    // }

    this.toasterService.success("Welcome to Home Page", "Success");

    // this.itemService
    //   .getItemByIdBasedOnTabName(this.tabHeaderName.toLowerCase(), this.userId)
    //   .subscribe((res) => {
    //     this.item = res;
    //     this.list = res.length;
    //   });
  }

  ngOnChanges() {
    this.itemService
      .getItemByIdBasedOnTabName(this.tabHeaderName.toLowerCase(), this.userId)
      .subscribe((res) => {
        this.item = res;
        this.list = res.length;
      });
  }

  handleTabChange(event: TabName) {
    if (event.isClicked) {
      this.tabHeaderName = event?.name;
    }
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      console.log(res);
      this.value.user = res;
      this.item = res.items;
      this.list = res.items.length;
      this.value.starItem = res.items.filter((p) => p.star === true);
      this.value.pinItem = res.items.filter((p) => p.pin === 'pin');
      const pin = res.items.filter((p) => p.pin === 'pin');
      const Unpin = res.items.filter((p) => p.pin !== 'pin');
      this.item = [...pin, ...Unpin];
      this.item.filter((p: any) => {
        this.tagList = [...this.tagList, ...p.tags];
      });
      this.value.tagList = this.tagList.filter(
        (value, index, self) => self.indexOf(value) === index
      );
    });
  }
  openDialog() {
    this.dialogRef.open(ModalComponent);
  }
  openDialogBoard(id: number) {
    this.dialogRef.open(AddBoardModelComponent);
    this.value.itemId = id;
  }

  arrangeInAlphabet() {
    const arrangeAlphabet = this.item.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    const pin = arrangeAlphabet.filter((p) => p.pin === 'pin');
    const Unpin = arrangeAlphabet.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
    this.modifiedDate = false;
  }

  ReverseInAlphabet() {
    const ReverseAlphabet = this.item.slice().sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    const pin = ReverseAlphabet.filter((p) => p.pin === 'pin');
    const Unpin = ReverseAlphabet.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
    this.modifiedDate = false;
  }

  CreationDate() {
    const creationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.insertionTime);
      const dateB = new Date(b.insertionTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    const pin = creationDate.filter((p) => p.pin === 'pin');
    const Unpin = creationDate.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
    this.modifiedDate = false;
  }

  ReverseCreationDate() {
    const creationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.insertionTime);
      const dateB = new Date(b.insertionTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    creationDate.reverse();
    const pin = creationDate.filter((p) => p.pin === 'pin');
    const Unpin = creationDate.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
    this.modifiedDate = false;
  }




  itemData = [
    {
      "title": "Vikram",
      "description": "Kamal Hasan",
      "urls": "https://en.wikipedia.org/wiki/Vikram_(2022_film)",
      "tags": [
        "Kamal",
        "Loki",
        "Lcu",
        "Arambikalangala",
        "Actor"
      ],
      "star": true,
      "img": "https://img1.hotstarext.com/image/upload/f_auto,t_hcdl/sources/r1/cms/prod/6237/1296237-h-5662015305e4",
      "pin": "",
      "insertionTime": "2023-08-10T16:48:16",
      "itemId": 2
    },
    {
      "title": "Vijay",
      "description": "Thee Thalapathi",
      "urls": "https://en.wikipedia.org/wiki/Vijay_(actor)",
      "tags": [
        "Thalapathi",
        "Leo",
        "Beast",
        "Actor"
      ],
      "star": false,
      "img": "https://wallpapercave.com/wp/wp7728020.jpg",
      "pin": "pin",
      "insertionTime": "2023-08-10T16:49:42",
      "itemId": 3
    },
    {
      "title": "Samsung S23 ultra (Amazon)",
      "description": "Samsung Phone S23 Ultra and its support 5G ",
      "urls": "https://www.amazon.in/Samsung-Galaxy-Ultra-Green-Storage/dp/B0BT9CXXXX/ref=sr_1_2_sspa?keywords=samsung+s23+ultra+5g&qid=1690982218&sprefix=sam%2Caps%2C214&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      "tags": [
        "Noteseries",
        "Samsung",
        "S23",
        "Amazon",
        "Mobilephone"
      ],
      "star": true,
      "img": "https://m.media-amazon.com/images/I/513Lu6lfOFL._SX350_.jpg",
      "pin": "",
      "insertionTime": "2023-08-10T16:53:24",
      "itemId": 4
    },
    {
      "title": "Instagram",
      "description": "It will navigate to instagram",
      "urls": "https://www.instagram.com/",
      "tags": [
        "Insta",
        "Instagram",
        "SocialMedia"
      ],
      "star": false,
      "img": "https://images.indianexpress.com/2023/07/Instagram-logo.jpg?w=414",
      "pin": "",
      "insertionTime": "2025-04-10T14:59:49",
      "itemId": 38
    },
    {
      "title": "IPhone 15 Leaks",
      "description": "Fresh iPhone 15 series leak reveals key changes, features, design, and prices",
      "urls": "https://www.indiatoday.in/technology/news/story/fresh-iphone-15-series-leak-reveals-key-changes-features-design-and-prices-2414855-2023-08-01",
      "tags": [
        "Iphone",
        "Apple",
        "Iphone15",
        "Mobilephone"
      ],
      "star": true,
      "img": "https://images.macrumors.com/t/zVQ62ycI0WRmsEcH6NLvsg21OC4=/2500x/article-new/2023/05/iphone-15-dummy-models.jpg",
      "pin": "Unpin",
      "insertionTime": "2023-08-10T16:56:37",
      "itemId": 5
    },
    {
      "title": "Alien",
      "description": "US hiding alien spacecraft and non-human remains",
      "urls": "https://timesofindia.indiatimes.com/world/us/us-hiding-alien-spacecraft-and-non-human-remains/articleshow/102186329.cms?from=mdr",
      "tags": [
        "Us",
        "Ufo",
        "Alien",
        "Non-human"
      ],
      "star": true,
      "img": "https://images.indianexpress.com/2023/07/ufo-hearing.jpg",
      "pin": "",
      "insertionTime": "2023-08-10T16:58:39",
      "itemId": 11
    },
    {
      "title": "Legion 5(Amazon)",
      "description": "Lenovo Legion 5 AMD Ryzen 7 5800H 15.6\" (39.62cm) WQHD IPS Gaming Laptop (16GB/1TB SSD/6GB NVIDIA RTX 3060/165Hz/Windows 11/Office 2021/RGB Backlit/3months Game Pass/Phantom Blue/2.4Kg)",
      "urls": "https://www.amazon.in/Lenovo-300Nits-Graphics-Refresh-82JU00SYIN/dp/B09NP41X5L/ref=sr_1_4?crid=3KROF3PDD1Q9Y&keywords=laptop+legion+5&qid=1690991551&sprefix=laptop+legion%2Caps%2C252&sr=8-4",
      "tags": [
        "Lenovo",
        "Pc",
        "Amazon",
        "Legion5",
        "Laptop"
      ],
      "star": false,
      "img": "https://static.digit.in/default/lenovo-legion-5i-pro-1280-32d724be6e.png",
      "pin": "",
      "insertionTime": "2023-08-10T16:58:54",
      "itemId": 12
    },
    {
      "title": "Rohit",
      "description": "Rohit Gurunath Sharma",
      "urls": "https://en.wikipedia.org/wiki/Rohit_Sharma",
      "tags": [
        "Hitman",
        "Indiancaptain",
        "Opener",
        "Cricket"
      ],
      "star": false,
      "img": "https://images.news18.com/ibnlive/uploads/2025/03/rohit-sharma-CT-AFP-2025-03-cbca37af0cfd7cc6dbdf21367847608b-16x9.jpg?impolicy=website&width=640&height=360",
      "pin": "",
      "insertionTime": "2023-08-10T16:59:06",
      "itemId": 13
    },
    {
      "title": "Sofa(Amazon)",
      "description": "duroflex Ease Fabric Sofa",
      "urls": "https://www.amazon.in/Duroflex-Ease-Fabric-Brown-Seater/dp/B09CHDTQMS/ref=sr_1_1_sspa?keywords=sofa&qid=1690984084&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      "tags": [
        "Duroflex",
        "Sofa",
        "Amazon"
      ],
      "star": false,
      "img": "https://m.media-amazon.com/images/I/61-2UrWug3L._SX522_.jpg",
      "pin": "",
      "insertionTime": "2023-08-10T16:59:27",
      "itemId": 14
    },
    {
      "title": "Crocs(Amazon)",
      "description": "slippers.",
      "urls": "https://www.amazon.in/crocs-Unisex-Adult-Crocband-11016-100-M11/dp/B0BQC55DQ9/ref=sr_1_12?keywords=crocs+men&qid=1690983300&sprefix=cro%2Caps%2C229&sr=8-12",
      "tags": [
        "Slipers",
        "Crocs",
        "Amazon"
      ],
      "star": false,
      "img": "https://rukminim2.flixcart.com/image/850/1000/kjabs7k0-0/sandal/e/4/a/8-205089-new-9-crocs-white-navy-original-imafyw4cn7zs2vdb.jpeg?q=90",
      "pin": "",
      "insertionTime": "2023-08-10T16:59:40",
      "itemId": 15
    },
    {
      "title": "Lenovo IdeaPad Gaming 3",
      "description": "Intel Core i5 12th Gen 15.6\" (39.62cm) FHD IPS Gaming Laptop (16GB/512GB SDD/4GB NVIDIA RTX 3050/120Hz/Win11/Office 2021/Backlit/3months Game Pass/Onyx Grey/2.32Kg), 82S9014LIN",
      "urls": "https://www.amazon.in/Lenovo-IdeaPad-39-62cm-Backlit-82S900R6IN/dp/B0B56C7NGS/ref=sr_1_7?keywords=ideapad+gaming+3&qid=1691573147&sprefix=ideapa%2Caps%2C408&sr=8-7",
      "tags": [
        "Lenovo",
        "Laptop",
        "Ideapad",
        "Amazon"
      ],
      "star": false,
      "img": "https://i.rtings.com/assets/products/aqRlbT9p/lenovo-ideapad-gaming-3-2021/design-medium.jpg",
      "pin": "",
      "insertionTime": "2023-08-10T16:59:50",
      "itemId": 16
    },
    {
      "title": "Hardik Pandya",
      "description": "Hardik Himanshu Pandya",
      "urls": "https://en.wikipedia.org/wiki/Hardik_Pandya",
      "tags": [
        "Indiancaptain",
        "Hitter",
        "Finisher",
        "Allrounder",
        "Cricket"
      ],
      "star": false,
      "img": "https://media.assettype.com/deccanherald%2F2024-07%2F08e63f78-4cdd-4ae7-a600-9ed41acbbdce%2FT20_World_Cup_Winning_Images__7_.JPG?w=undefined&auto=format%2Ccompress&fit=max",
      "pin": "",
      "insertionTime": "2023-08-10T17:00:03",
      "itemId": 17
    },
    {
      "title": "Jaddu",
      "description": "Indian Crickrter",
      "urls": "https://www.cricbuzz.com/profiles/587/ravindra-jadeja",
      "tags": [
        "Allrounder",
        "Csk",
        "Spinner",
        "Thuthuvan",
        "Cricket"
      ],
      "star": false,
      "img": "https://static.toiimg.com/thumb/msid-100603689,width-1280,resizemode-4/100603689.jpg",
      "pin": "",
      "insertionTime": "2023-08-10T17:13:41",
      "itemId": 20
    },
    {
      "title": "TUF Gaming Laptop",
      "description": "ASUS TUF Gaming F15, 15.6-inch (39.62 cms) FHD 144Hz, Intel Core i7-12700H 12th Gen, 4GB NVIDIA GeForce RTX 3050, Gaming Laptop (16GB/1TB SSD/Windows 11/90WHrs Battery/Gray/2.20 Kg), FX577ZC-HN192W",
      "urls": "https://www.amazon.in/ASUS-15-6-inch-i7-12700H-GeForce-FX577ZC-HN192W/dp/B0CCYDKS4P/ref=sr_1_1?crid=13CNEYM5BSDC6&keywords=tuf+gaming+laptop&nav_sdd=aps&qid=1692210444&refinements=p_n_feature_thirteen_browse-bin%3A12598163031&rnid=12598141031&s=computers&sprefix=tuf&sr=1-1",
      "tags": [
        "Amazon",
        "Asus",
        "Laptop",
        "Gaming"
      ],
      "star": false,
      "img": "https://sm.pcmag.com/t/pcmag_au/review/a/asus-tuf-g/asus-tuf-gaming-f17-2022_bky9.1920.jpg",
      "pin": "",
      "insertionTime": "2023-08-16T23:58:35",
      "itemId": 23
    },
    {
      "title": "Deadpool Comics",
      "description": "Vol:1 Ep-001 ",
      "urls": "https://readallcomics.com/deadpool-v1-001/",
      "tags": [
        "Comics",
        "Marvel",
        "Deadpool"
      ],
      "star": false,
      "img": "https://getwallpapers.com/wallpaper/full/d/3/6/384519.jpg",
      "pin": "",
      "insertionTime": "2023-08-19T19:55:58",
      "itemId": 25
    },
    {
      "title": "Doctor Strange",
      "description": "Master of the Mystic Arts 57",
      "urls": "https://readallcomics.com/doctor-strange-v2-master-of-the-mystic-arts-57/",
      "tags": [
        "DoctorStrange",
        "Marvel",
        "Comics"
      ],
      "star": false,
      "img": "https://c4.wallpaperflare.com/wallpaper/683/162/531/doctor-strange-artwork-minimal-hd-wallpaper-preview.jpg",
      "pin": "",
      "insertionTime": "2023-08-19T23:49:21",
      "itemId": 26
    },
    {
      "title": "virat kohli",
      "description": "ICC ranking ",
      "urls": "https://www.cricbuzz.com/profiles/1413/virat-kohli",
      "tags": [
        "Indiancaptain",
        "Virat",
        "Cricket"
      ],
      "star": true,
      "img": "https://www.hindustantimes.com/ht-img/img/2023/08/18/1600x900/kohli_71_1683829193033_1692354506172.webp",
      "pin": "",
      "insertionTime": "2023-09-25T18:47:06",
      "itemId": 30
    },
    {
      "title": "Chennai pub",
      "description": "",
      "urls": "https://lbb.in/chennai/best-nightclubs-and-pubs-in-chennai/",
      "tags": [
        "Pub",
        "Channai",
        "HotNew"
      ],
      "star": true,
      "img": "https://www.fabhotels.com/blog/wp-content/uploads/2018/07/1000x650_040718_Gatsby2.jpg",
      "pin": "Unpin",
      "insertionTime": "2023-11-23T00:00:33",
      "itemId": 32
    },
    {
      "title": "LEO",
      "description": "Leo movie comes under LCU",
      "urls": "https://youtu.be/Po3jStA673E",
      "tags": [
        "Lcu",
        "Loki",
        "Vijay",
        "Thalapathi"
      ],
      "star": false,
      "img": "https://www.livemint.com/lm-img/img/2023/10/12/600x338/leo_1695203139927_1697097755570.jpg",
      "pin": "",
      "insertionTime": "2024-03-16T16:41:46",
      "itemId": 35
    }
  ]
}
