import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SearchTransport } from 'src/app/models/SearchTransport';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public transport: SearchTransport;
  public isModalVisible = false;

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
        this.isModalVisible = true;
      },
        err => {
          this.isModalVisible = false;
          this.toastr.warning(err,"Warning");
        });
  }
  hideModal()
  {
    this.isModalVisible = false;
  }
}
