import { Component, OnInit } from '@angular/core';
import { PostingService } from '../../posting.service';
import { Posting } from '../../models/Posting';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss']
})
export class PostingsComponent implements OnInit {
  postings:Posting[];
  totalPages:number;
  totalPagesArr:number[];
  currentPage:number;

  constructor(private postingService: PostingService) { }

  ngOnInit() {
    this.getPostings();

  }

  getPostings(): void {
    this.postingService.getPostings()
      .subscribe(posts => {
        this.postings = posts.data;
        this.totalPages = posts.totalPages;
        this.totalPagesArr = Array(this.totalPages).fill(0).map((x,i)=>i+1);
      });
  }

  changePage(page:number): void {
    console.log('change page');
    this.currentPage = page;
    this.postingService.getPostings(page)
      .subscribe(posts => {
        this.postings = posts.data;
      });
  }

}
