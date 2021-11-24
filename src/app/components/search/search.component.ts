import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Transport } from 'src/app/models/Transport';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public transport: Transport | null;

  constructor(private fb: FormBuilder, private searchService: SearchService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public searchForm = this.fb.group({
    search: ['']
  });

  search() {
    let text = this.searchForm.value;
    this.searchService.search(text.search)
      .subscribe(data => {
        this.transport = data;
      },
        err => {
          this.transport = null;
          this.toastr.warning(err,"Warning");
        });
  }
}
